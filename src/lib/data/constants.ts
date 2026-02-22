export const SITE_NAME = 'Green Label Services'
export const SITE_DESCRIPTION = 'Safe And Trusted Waste Collection Service'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://greenlabelservicesug.com'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ainer2014@gmail.com'

export const BRAND_COLORS = {
  green: '#2c632c',
  greenLight: '#3a7d3a',
  greenDark: '#1e4a1e',
  orange: '#F7941D',
  orangeLight: '#f9a94d',
  orangeDark: '#d67a0a',
} as const

export const COMPANY_INFO = {
  name: 'Green Label Services Ltd',
  tagline: 'Safe And Trusted Waste Collection Service',
  address: 'Plot 89, Block 29 Church Road, Off Mawanda Rd, Kampala, Uganda',
  email: 'info@greenlabelservicesug.com',
  emailAlt: 'greenlabel@greenlabelservicesug.com',
  phones: ['+256 772 423 092', '+256 705 348 888', '+256 393 103 427'],
  whatsapp: '+256 705 348 888',
  emergencyHotline: '+256 772 423 092',
  workingHours: {
    weekdays: 'Mon - Fri: 8:00 AM - 5:00 PM',
    saturday: 'Sat: 9:00 AM - 1:00 PM',
    sunday: 'Sun: Closed',
  },
  social: {
    facebook: 'https://www.facebook.com/greenlabelservices',
    linkedin: 'https://www.linkedin.com/company/greenlabelservices',
  },
  geo: {
    latitude: 0.3476,
    longitude: 32.5825,
  },
  founded: 2000,
  yearsExperience: 25,
} as const

export const STATS = {
  qualifiedEmployees: 300,
  collectionVehicles: 50,
  geographicCoverage: 99,
  customerSatisfaction: 99.9,
  tonnesRecycledAnnually: 76000,
  clientsServed: 2194,
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Company',
    children: [
      {
        heading: 'About Us',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Leadership Team', href: '/leadership' },
          { label: 'Awards & Recognition', href: '/awards' },
          { label: 'Our Story', href: '/our-story' },
          { label: 'Project Profiles', href: '/projects' },
          { label: 'Careers', href: '/careers' },
        ],
      },
      {
        heading: 'Our Commitment',
        links: [
          { label: 'Sustainability', href: '/eco' },
          { label: 'Safety Standards', href: '/safety' },
          { label: 'Community Impact', href: '/community' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    children: [
      {
        heading: 'Industries',
        links: [
          { label: 'Waste Management', href: '/waste-management' },
          { label: 'Oil & Gas', href: '/oil-and-gas' },
          { label: 'Public Health', href: '/public-health' },
          { label: 'Education & Training', href: '/training' },
          { label: 'Mining', href: '/mining' },
          { label: 'Transport & Logistics', href: '/transport' },
        ],
      },
    ],
    dynamicServices: true,
  },
  {
    label: 'News & Media',
    children: [
      {
        heading: '',
        links: [
          { label: 'Press Releases', href: '/press-releases' },
          { label: 'Blog', href: '/blog' },
          { label: 'Gallery', href: '/gallery' },
        ],
      },
    ],
  },
  {
    label: 'Capacity',
    children: [
      {
        heading: '',
        links: [
          { label: 'Vehicles', href: '/fleet' },
          { label: 'Finances', href: '/finances' },
          { label: 'Human Resources', href: '/human-resources' },
          { label: 'Infrastructure', href: '/infrastructure' },
        ],
      },
    ],
  },
] as const

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Sustainability', href: '/eco' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Newsroom', href: '/press-releases' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Careers', href: '/careers' },
    { label: 'Projects', href: '/projects' },
  ],
  industries: [
    { label: 'Waste Management', href: '/waste-management' },
    { label: 'Oil & Gas', href: '/oil-and-gas' },
    { label: 'Public Health', href: '/public-health' },
    { label: 'Transport', href: '/transport' },
    { label: 'Education', href: '/training' },
    { label: 'Mining', href: '/mining' },
  ],
  policies: [
    { label: 'QEHS Policy', href: '/qehs-policy' },
    { label: 'Privacy Statement', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
} as const
