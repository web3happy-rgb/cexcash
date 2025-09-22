import PageHeader from '../components/PageHeader.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';

const tools = [
  {
    title: 'Referral Link Composer',
    description: 'Generate geo-aware smart links identical to the tethermax.io partner hub with language detection and UTM injection.'
  },
  {
    title: 'Volume Simulator',
    description: 'Project earnings by VIP tier, factoring in maker/taker splits and derivatives boosts.'
  },
  {
    title: 'Creative Library',
    description: 'Download 200+ yellow-and-black banners optimized for social, display, and influencer placements.'
  }
];

export default function ResourcesToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Tools"
        title="Automation suite"
        subtitle="Match the tethermax.io toolkit with exportable creatives and analytics helpers."
      />
      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-xl text-white">{tool.title}</h3>
              <p className="mt-3 text-sm text-white/60">{tool.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
