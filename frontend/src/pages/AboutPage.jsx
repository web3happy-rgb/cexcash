import PageHeader from '../components/PageHeader.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';
import BulletList from '../components/BulletList.jsx';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Our Story"
        title="From liquidity desks to affiliate excellence"
        subtitle="We engineered CEXCash to reproduce the polished experience from tethermax.io while letting partners customize every pixel."
      />
      <SectionWrapper heading="Why founders trust us" subheading="Run campaigns backed by traders who manage billions in monthly volume.">
        <BulletList
          items={[
            'Core team with 12+ years across derivatives exchanges and liquidity provisioning.',
            'Dedicated concierge desks mirroring the TetherMax partner support structure.',
            'Compliance workflows covering 40+ jurisdictions with localized creatives.'
          ]}
        />
      </SectionWrapper>
      <SectionWrapper heading="Global footprint" subheading="Operate in 16 languages with localized payout rails.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Singapore', copy: 'APAC headquarters with 24/7 operations team.' },
            { title: 'Lisbon', copy: 'EU marketing studio and legal review pod.' },
            { title: 'São Paulo', copy: 'LATAM growth team specializing in influencer activations.' }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow/80">{item.title}</p>
              <p className="mt-3 text-sm text-white/60">{item.copy}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
