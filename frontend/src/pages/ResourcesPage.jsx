import ContentSections from '../components/ContentSections.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { usePageContent } from '../hooks/usePageContent.js';

export default function ResourcesPage() {
  const { sections, loading, error } = usePageContent('resources');

  if (loading) return <LoadingState label="Loading resources" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <PageHeader
        eyebrow="Media Kits"
        title="Ready-to-launch campaigns and localization kits"
        subtitle="Download all the creative, compliance, and automation assets you need to run a best-in-class rebate funnel."
      />
      <ContentSections sections={sections} />
    </div>
  );
}
