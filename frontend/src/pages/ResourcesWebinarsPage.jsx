import PageHeader from '../components/PageHeader.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';

const webinars = [
  {
    title: 'Scaling referrals with TetherMax funnels',
    date: 'Weekly',
    description: 'Live teardown of the tethermax.io landing page structure and how to recreate it using our builder.'
  },
  {
    title: 'Compliance deep dive',
    date: 'Bi-weekly',
    description: 'Walk through regional advertising restrictions, including CN, EU, and LATAM requirements.'
  },
  {
    title: 'Trading strategy sync',
    date: 'Monthly',
    description: 'Partner with our derivatives desk to align campaigns with upcoming product launches.'
  }
];

export default function ResourcesWebinarsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Education"
        title="Live webinars"
        subtitle="On-demand training that mirrors the official TetherMax partner curriculum."
      />
      <SectionWrapper>
        <div className="space-y-4">
          {webinars.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow/80">{item.date}</p>
              <h3 className="mt-3 font-display text-2xl text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
