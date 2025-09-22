import BulletList from './BulletList.jsx';
import MetricsGrid from './MetricsGrid.jsx';
import SectionWrapper from './SectionWrapper.jsx';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function renderMedia(media) {
  if (!media) return null;
  if (Array.isArray(media)) {
    return <MetricsGrid items={media} />;
  }

  if (typeof media === 'string' && media.endsWith('.svg')) {
    return (
      <div className="flex justify-center">
        <img src={`${API_BASE}${media}`} alt="Section graphic" className="max-w-md" />
      </div>
    );
  }

  if (typeof media === 'object') {
    return <MetricsGrid items={media} />;
  }

  return null;
}

export default function ContentSections({ sections = [] }) {
  return sections.map((section) => (
    <SectionWrapper key={section.key} heading={section.heading} subheading={section.subheading}>
      {Array.isArray(section.body) ? <BulletList items={section.body} /> : <p className="text-white/70">{section.body}</p>}
      {renderMedia(section.media)}
      {Array.isArray(section.ctas) ? (
        <div className="flex flex-wrap gap-4 pt-6">
          {section.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                cta.primary !== false
                  ? 'bg-brand-yellow text-brand-black shadow-glow hover:bg-yellow-300'
                  : 'border border-white/20 text-white hover:border-brand-yellow/50 hover:text-brand-yellow'
              }`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </SectionWrapper>
  ));
}
