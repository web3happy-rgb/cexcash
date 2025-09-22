import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';
import BulletList from '../components/BulletList.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { usePageContent } from '../hooks/usePageContent.js';

export default function FaqPage() {
  const { sections, loading, error } = usePageContent('faq');

  if (loading) return <LoadingState label="Loading FAQs" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Answers for pro-level affiliates"
        subtitle="The same responses our TetherMax concierge team provides to top-performing partners."
      />
      {sections.map((section) => (
        <SectionWrapper key={section.key} heading={section.heading} subheading={section.subheading}>
          <BulletList items={section.body} />
        </SectionWrapper>
      ))}
    </div>
  );
}
