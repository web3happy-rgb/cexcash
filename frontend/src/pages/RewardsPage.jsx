import ContentSections from '../components/ContentSections.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { usePageContent } from '../hooks/usePageContent.js';

export default function RewardsPage() {
  const { sections, loading, error } = usePageContent('rewards');

  if (loading) return <LoadingState label="Loading rewards" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <PageHeader
        eyebrow="VIP Partner Matrix"
        title="A referral stack built for serious traders"
        subtitle="Match the exact rebate schedule from TetherMax with customizable VIP tiers, multi-level trees, and automated settlement windows."
      />
      <ContentSections sections={sections} />
    </div>
  );
}
