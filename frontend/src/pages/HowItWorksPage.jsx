import ContentSections from '../components/ContentSections.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { usePageContent } from '../hooks/usePageContent.js';

export default function HowItWorksPage() {
  const { sections, loading, error } = usePageContent('how-it-works');

  if (loading) return <LoadingState label="Loading workflow" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <PageHeader
        eyebrow="Automation"
        title="Replicate the TetherMax onboarding journey"
        subtitle="KYC flows, marketing funnels, and payout automation tuned to global compliance standards."
      />
      <ContentSections sections={sections} />
    </div>
  );
}
