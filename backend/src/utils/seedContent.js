const db = require('../db');

const sections = [
  {
    slug: 'home',
    section_key: 'hero',
    heading: 'Earn up to 60% lifetime rebates.',
    subheading: 'Empower your community with institutional-grade trading rebates and transparent reporting.',
    body: JSON.stringify([
      'Unlock top-tier exchange rewards with a partner program designed for creators, traders, and community leaders.',
      'Our lightning-fast settlements and transparent dashboards mirror the TetherMax experience while adding pro-focused analytics.'
    ]),
    media: '/assets/hero-chart.svg',
    ctas: JSON.stringify([
      { label: 'Start Earning', href: '/dashboard' },
      { label: 'Explore Rewards', href: '/rewards' }
    ]),
    position: 0
  },
  {
    slug: 'home',
    section_key: 'metrics',
    heading: 'Performance that scales with your influence',
    subheading: 'Track every click, signup, and trading rebate inside a real-time dashboard.',
    body: JSON.stringify([
      'Average partner ROI: 182% within the first 90 days.',
      'Native compliance center and multi-tier verification workflow.',
      'Cross-exchange liquidity routing with sub-second execution.'
    ]),
    media: JSON.stringify([
      { label: 'Global Partners', value: '120+', caption: 'Premium trading communities' },
      { label: 'Average Rebate', value: '60%', caption: 'Lifetime earning potential' },
      { label: 'Instant Payouts', value: '< 24h', caption: 'Automated USDT settlements' }
    ]),
    position: 1
  },
  {
    slug: 'home',
    section_key: 'workflow',
    heading: 'From signup to payout in three streamlined steps',
    subheading: 'Launch a revenue engine for your community in less than five minutes.',
    body: JSON.stringify([
      '1. Create your partner account and configure a unique referral profile.',
      '2. Share auto-generated smart links tuned for your target markets.',
      '3. Monitor live derivatives and spot rebates with enterprise-grade analytics.'
    ]),
    media: '/assets/workflow-diagram.svg',
    ctas: JSON.stringify([
      { label: 'View Integration Guide', href: '/how-it-works' }
    ]),
    position: 2
  },
  {
    slug: 'rewards',
    section_key: 'tiers',
    heading: 'Tiered rebate structures that mirror institutional desks',
    subheading: 'Scale rewards across ten VIP levels covering spot, futures, and liquidity provisioning.',
    body: JSON.stringify([
      'VIP 1: 20% base rebate — perfect for new communities ramping up volume.',
      'VIP 5: 45% blended rebate plus marketing development funds.',
      'VIP 10: 60% lifetime rebate with custom liquidity lines and OTC support.'
    ]),
    media: JSON.stringify([
      { level: 'VIP 1', volume: '0 - 5M USDT', rebate: '20%' },
      { level: 'VIP 4', volume: '50M USDT', rebate: '38%' },
      { level: 'VIP 7', volume: '250M USDT', rebate: '52%' },
      { level: 'VIP 10', volume: '1B+ USDT', rebate: '60%' }
    ]),
    ctas: JSON.stringify([
      { label: 'Compare Full Matrix', href: '/rewards/matrix' }
    ]),
    position: 0
  },
  {
    slug: 'how-it-works',
    section_key: 'automation',
    heading: 'Automation built for scale',
    subheading: 'Compliance-ready KYC, automated payouts, and white-glove onboarding for elite partners.',
    body: JSON.stringify([
      'Automated ID verification with regional compliance presets.',
      'Daily and monthly payout schedules configurable per campaign.',
      'Dedicated success managers to optimize your marketing funnels.'
    ]),
    media: '/assets/automation-suite.svg',
    position: 0
  },
  {
    slug: 'resources',
    section_key: 'support',
    heading: 'Launch-ready resources and co-branded creative kits',
    subheading: 'Download campaign templates, compliance guidelines, and localization packs.',
    body: JSON.stringify([
      'Access 50+ ready-to-use landing page templates tailored for APAC, LATAM, and EMEA regions.',
      'Localized scripts and email sequences created by high-performing partners.',
      'Quarterly growth playbooks covering derivatives pushes and new product launches.'
    ]),
    media: '/assets/resource-kit.svg',
    ctas: JSON.stringify([
      { label: 'Download Media Kit', href: '/resources/media-kit' },
      { label: 'Book Strategy Call', href: '/contact' }
    ]),
    position: 0
  },
  {
    slug: 'faq',
    section_key: 'questions',
    heading: 'Frequently asked questions',
    subheading: 'Everything you need to know before activating your campaign.',
    body: JSON.stringify([
      {
        question: 'How quickly can I start earning rebates?',
        answer: 'Most partners activate within minutes. Verified payouts begin once your community executes their first trades.'
      },
      {
        question: 'Do you support multi-level referrals?',
        answer: 'Yes. Configure up to three tiers of sub-affiliate structures and track their rewards independently.'
      },
      {
        question: 'Which assets are eligible for rebates?',
        answer: 'Spot, perpetual futures, options, and liquidity pools across USDT, USDC, and BTC markets.'
      }
    ]),
    position: 0
  }
];

function seedContent() {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO page_sections (slug, section_key, heading, subheading, body, media, ctas, position)
    VALUES (@slug, @section_key, @heading, @subheading, @body, @media, @ctas, @position)
  `);

  const transaction = db.transaction((items) => {
    items.forEach((item) =>
      insert.run({
        slug: item.slug,
        section_key: item.section_key,
        heading: item.heading ?? null,
        subheading: item.subheading ?? null,
        body: item.body ?? null,
        media: item.media ?? null,
        ctas: item.ctas ?? null,
        position: item.position ?? 0
      })
    );
  });

  transaction(sections);
}

module.exports = seedContent;
