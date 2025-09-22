const { nanoid } = require('nanoid');
const db = require('../db');

const insertReferralStmt = db.prepare(`
  INSERT INTO referral_codes (user_id, code, description, reward_rate)
  VALUES (?, ?, ?, ?)
`);

const findReferralByCodeStmt = db.prepare('SELECT * FROM referral_codes WHERE code = ?');
const listReferralsByUserStmt = db.prepare('SELECT * FROM referral_codes WHERE user_id = ? ORDER BY created_at DESC');
const insertReferralStatStmt = db.prepare(`
  INSERT INTO referral_stats (referral_code_id, referred_email, trading_volume, reward_amount, status)
  VALUES (?, ?, ?, ?, ?)
`);
const statsByCodeStmt = db.prepare(`
  SELECT
    COUNT(*) AS referrals,
    SUM(trading_volume) AS total_volume,
    SUM(reward_amount) AS total_rewards,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed
  FROM referral_stats
  WHERE referral_code_id = ?
`);

const latestStatsByCodeStmt = db.prepare(`
  SELECT referred_email, trading_volume, reward_amount, status, created_at
  FROM referral_stats
  WHERE referral_code_id = ?
  ORDER BY created_at DESC
  LIMIT 20
`);

const summaryForUserStmt = db.prepare(`
  SELECT
    COUNT(DISTINCT rc.id) AS total_codes,
    COUNT(rs.id) AS total_referrals,
    IFNULL(SUM(rs.trading_volume), 0) AS total_volume,
    IFNULL(SUM(rs.reward_amount), 0) AS total_rewards
  FROM referral_codes rc
  LEFT JOIN referral_stats rs ON rc.id = rs.referral_code_id
  WHERE rc.user_id = ?
`);

function createReferral(req, res) {
  const { description, rewardRate, code } = req.body;
  const userId = req.user.id;

  const finalCode = (code || `cex-${nanoid(6)}`).toLowerCase();

  const existing = findReferralByCodeStmt.get(finalCode);
  if (existing) {
    return res.status(409).json({ message: 'Referral code already exists.' });
  }

  const info = insertReferralStmt.run(userId, finalCode, description || '', rewardRate || 0);
  const stats = statsByCodeStmt.get(info.lastInsertRowid);

  res.status(201).json({
    referral: {
      id: info.lastInsertRowid,
      code: finalCode,
      description: description || '',
      reward_rate: rewardRate || 0,
      created_at: new Date().toISOString(),
      stats: {
        ...stats,
        referrals: stats.referrals || 0,
        total_volume: stats.total_volume || 0,
        total_rewards: stats.total_rewards || 0,
        completed: stats.completed || 0
      }
    }
  });
}

function listReferrals(req, res) {
  const userId = req.user.id;
  const referrals = listReferralsByUserStmt.all(userId);

  const data = referrals.map((referral) => {
    const stats = statsByCodeStmt.get(referral.id);
    return {
      ...referral,
      stats: {
        referrals: stats.referrals || 0,
        total_volume: stats.total_volume || 0,
        total_rewards: stats.total_rewards || 0,
        completed: stats.completed || 0
      },
      latest: latestStatsByCodeStmt.all(referral.id)
    };
  });

  res.json({ referrals: data });
}

function recordReferralActivity(req, res) {
  const { code } = req.params;
  const { referredEmail, tradingVolume, rewardAmount, status } = req.body;

  const referral = findReferralByCodeStmt.get(code);
  if (!referral) {
    return res.status(404).json({ message: 'Referral code not found.' });
  }

  if (referral.user_id !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to modify this referral code.' });
  }

  insertReferralStatStmt.run(
    referral.id,
    referredEmail || null,
    Number(tradingVolume) || 0,
    Number(rewardAmount) || 0,
    status || 'pending'
  );

  const stats = statsByCodeStmt.get(referral.id);
  const latest = latestStatsByCodeStmt.all(referral.id);

  res.status(201).json({
    referral: {
      ...referral,
      stats: {
        referrals: stats.referrals || 0,
        total_volume: stats.total_volume || 0,
        total_rewards: stats.total_rewards || 0,
        completed: stats.completed || 0
      },
      latest
    }
  });
}

function summary(req, res) {
  const userId = req.user.id;
  const stats = summaryForUserStmt.get(userId);

  res.json({
    summary: {
      total_codes: stats.total_codes || 0,
      total_referrals: stats.total_referrals || 0,
      total_volume: stats.total_volume || 0,
      total_rewards: stats.total_rewards || 0
    }
  });
}

module.exports = {
  createReferral,
  listReferrals,
  recordReferralActivity,
  summary
};
