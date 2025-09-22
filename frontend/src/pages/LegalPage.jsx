import PageHeader from '../components/PageHeader.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';

const sections = [
  {
    title: '1. Program eligibility',
    body: 'Partners must operate compliant marketing practices in all applicable jurisdictions and follow the same standards outlined on tethermax.io. Verification includes KYC, KYB, and marketing review.'
  },
  {
    title: '2. Reward calculations',
    body: 'Rebates are calculated daily based on executed trades, net of clawbacks, and follow the published VIP matrix. Payments occur in USDT within 24 hours of settlement.'
  },
  {
    title: '3. Brand usage',
    body: 'Logos, banners, and co-branded assets may be used within approved guidelines. Any paid advertising must receive pre-approval from our compliance desk.'
  },
  {
    title: '4. Termination',
    body: 'We reserve the right to suspend or terminate accounts violating market manipulation, wash trading, or non-compliant promotions.'
  }
];

export default function LegalPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Affiliate program terms"
        subtitle="Transparent policies aligned with TetherMax global partner agreements."
      />
      {sections.map((section) => (
        <SectionWrapper key={section.title} heading={section.title}>
          <p className="text-sm leading-relaxed text-white/60">{section.body}</p>
        </SectionWrapper>
      ))}
    </div>
  );
}
