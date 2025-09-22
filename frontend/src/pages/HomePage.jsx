import ContentSections from '../components/ContentSections.jsx';
import HeroSection from '../components/HeroSection.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import { usePageContent } from '../hooks/usePageContent.js';

export default function HomePage() {
  const { sections, loading, error } = usePageContent('home');

  if (loading) {
    return <LoadingState label="Loading homepage" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const hero = sections.find((section) => section.key === 'hero');
  const rest = sections.filter((section) => section.key !== 'hero');

  return (
    <div>
      {hero ? (
        <HeroSection
          heading={hero.heading}
          subheading={hero.subheading}
          body={hero.body}
          ctas={hero.ctas || []}
          media={hero.media}
        />
      ) : null}
      <ContentSections sections={rest} />
    </div>
  );
}
