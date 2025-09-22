import { useEffect, useState } from 'react';
import AuthCard from '../components/AuthCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import ReferralForm from '../components/ReferralForm.jsx';
import ReferralTable from '../components/ReferralTable.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createReferral, listReferrals, recordReferralActivity, referralSummary } from '../services/api.js';

export default function DashboardPage() {
  const { user, loading: authLoading, error, login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [summary, setSummary] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoadingData(true);
      try {
        const [{ summary }, { referrals }] = await Promise.all([referralSummary(), listReferrals()]);
        setSummary(summary);
        setReferrals(referrals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [user]);

  async function handleCreateReferral(payload) {
    const { referral } = await createReferral(payload);
    setReferrals((prev) => [referral, ...prev]);
    const { summary } = await referralSummary();
    setSummary(summary);
  }

  async function handleAddActivity(code, payload) {
    const { referral } = await recordReferralActivity(code, payload);
    setReferrals((prev) => prev.map((item) => (item.code === referral.code ? referral : item)));
    const { summary } = await referralSummary();
    setSummary(summary);
  }

  if (authLoading) {
    return <LoadingState label="Loading console" />;
  }

  if (!user) {
    return (
      <div className="grid gap-10 md:grid-cols-2">
        <AuthCard
          mode={mode}
          onSubmit={mode === 'login' ? login : register}
          switchMode={() => setMode((prev) => (prev === 'login' ? 'register' : 'login'))}
          error={error}
        />
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gray via-black to-black p-8">
          <h3 className="font-display text-3xl text-white">Why partners love our dashboard</h3>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            <li>• Mirror tethermax.io analytics with real-time trade ingestion.</li>
            <li>• Export-ready payout statements with automated USDT settlements.</li>
            <li>• Multi-level sub-affiliate trees with live performance alerts.</li>
          </ul>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow/80">Avg. activation</p>
              <p className="mt-2 font-display text-3xl text-white">4m 12s</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow/80">Payout speed</p>
              <p className="mt-2 font-display text-3xl text-white">&lt; 24h</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <SummaryCards summary={summary} />
      <SectionWrapper heading="Generate referral campaigns" subheading="Spin up codes styled after tethermax.io in seconds.">
        <ReferralForm onCreate={handleCreateReferral} />
      </SectionWrapper>
      <SectionWrapper heading="Performance tracking" subheading="Monitor VIP tiers, conversions, and payouts in real time.">
        {loadingData ? <LoadingState label="Syncing data" /> : <ReferralTable referrals={referrals} onAddActivity={handleAddActivity} />}
      </SectionWrapper>
    </div>
  );
}
