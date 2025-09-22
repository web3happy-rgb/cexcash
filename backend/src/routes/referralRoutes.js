const express = require('express');
const authenticate = require('../middleware/auth');
const {
  createReferral,
  listReferrals,
  recordReferralActivity,
  summary
} = require('../controllers/referralController');

const router = express.Router();

router.use(authenticate);
router.post('/', createReferral);
router.get('/', listReferrals);
router.post('/:code/stats', recordReferralActivity);
router.get('/summary/stats', summary);

module.exports = router;
