/**
 * Sanity CMS Content Seeder
 *
 * Seeds initial content from the Django site into Sanity CMS.
 * Run with: npx tsx scripts/seed-sanity.ts
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (must have write permissions)
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

// ============================================================================
// TEAM MEMBERS
// ============================================================================
const teamMembers = [
  {
    _type: 'teamMember',
    _id: 'team-grace-mugume',
    name: 'Dr Grace Mugume',
    role: 'Managing Director (CEO)',
    bio: 'With over 20 years of experience in environmental management and business leadership, Dr. Grace Mugume has been instrumental in establishing Green Label Services as Uganda\'s premier waste management company. His vision for sustainable environmental solutions continues to drive the company\'s growth and innovation.',
    expertiseTags: ['Strategic Leadership', 'Environmental Policy', 'Business Development'],
    isExecutive: true,
    socialLinks: [
      { _key: 'email', platform: 'email', url: 'mailto:greenlabel@greenlabel-services.com' },
    ],
  },
  {
    _type: 'teamMember',
    _id: 'team-justine',
    name: 'Ms Justine',
    role: 'Independent Director',
    bio: 'Finance professional and strategic leader with extensive experience in financial management, budgeting, and accounting practices. Proven track record in driving fiscal responsibility and ensuring compliance within dynamic operational environments.',
    expertiseTags: ['Financial Management', 'Strategic Planning', 'Compliance'],
    isExecutive: false,
  },
  {
    _type: 'teamMember',
    _id: 'team-adolf-kabagambe',
    name: 'Mr Adolf Kabagambe',
    role: 'Non-Executive Director',
    bio: 'Experienced operations leader with a strong background in transport logistics and fleet maintenance management across the East African region. Proven ability to streamline vehicle operations, ensure regulatory compliance, and implement cost-effective maintenance strategies to support organizational growth at Green Label Services.',
    expertiseTags: ['Transport Logistics', 'Fleet Management', 'Operations'],
    isExecutive: false,
  },
]

// ============================================================================
// COMPANY MILESTONES
// ============================================================================
const milestones = [
  {
    _type: 'companyMilestone',
    _id: 'milestone-2000',
    year: '2000',
    icon: 'fa-seedling',
    title: 'The Beginning',
    description: 'Green Label Services was founded in March 2000 as an environment and public health consultancy firm. Our vision was simple yet ambitious: to create a sustainable waste management solution for Uganda while promoting environmental responsibility and public health safety.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2003',
    year: '2003',
    icon: 'fa-hospital',
    title: 'First Major Healthcare Partnership',
    description: 'Secured our first major contract with Mulago Hospital for medical waste management. This partnership established our reputation in the healthcare sector and demonstrated our capability to handle complex, hazardous waste disposal requirements safely and efficiently.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2007',
    year: '2007',
    icon: 'fa-oil-well',
    title: 'Oil & Gas Sector Entry',
    description: 'Expanded into oil and gas waste management, partnering with major international companies including CNOOC and COSL. This diversification positioned us as a comprehensive waste management solution provider for Uganda\'s emerging oil industry.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2012',
    year: '2012',
    icon: 'fa-industry',
    title: 'Infrastructure Milestone',
    description: 'Established our primary waste treatment facility in Iganga District, Eastern Uganda. The facility features high-temperature incineration capabilities, secure storage systems, and advanced treatment technologies, significantly expanding our service capacity.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2016',
    year: '2016',
    icon: 'fa-recycle',
    title: 'Sustainability Revolution',
    description: 'Launched major sustainability initiatives including plastic recycling programs and energy-from-waste projects. These innovations led to a significant reduction in Uganda\'s carbon emissions and established new industry standards for environmental responsibility.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2019',
    year: '2019',
    icon: 'fa-map-marked-alt',
    title: 'Regional Expansion',
    description: 'Opened our secondary facility in Mbarara, Western Uganda, equipped with state-of-the-art autoclave technology. This expansion enabled us to provide environmentally friendly, non-burn solutions for infectious and sharps waste across multiple regions.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2022',
    year: '2022',
    icon: 'fa-laptop-code',
    title: 'Digital Innovation',
    description: 'Implemented digital tracking systems and IoT-enabled waste monitoring solutions. These technological advances improved efficiency, enhanced safety protocols, and provided real-time visibility into waste management processes for our clients.',
  },
  {
    _type: 'companyMilestone',
    _id: 'milestone-2025',
    year: '2025',
    icon: 'fa-rocket',
    title: 'Leading the Future',
    description: 'Today, we continue to lead Uganda\'s waste management industry with innovative solutions, expanded service offerings, and unwavering commitment to environmental sustainability. Our vision extends beyond waste management to creating a circular economy that benefits all Ugandans.',
  },
]

// ============================================================================
// NEMA LICENSES
// ============================================================================
const nemaLicenses = [
  {
    _type: 'nemaLicense',
    _id: 'nema-mbarara',
    title: 'Mbarara WTP Operating License',
    number: 'WT051/2024',
    scope: 'License to Own and Operate Waste Treatment Plant in Mbarara - Western Region',
    issueDate: '2024-03-01',
    expiryDate: '2027-03-01',
  },
  {
    _type: 'nemaLicense',
    _id: 'nema-iganga',
    title: 'Iganga WTP Operating License',
    number: 'WT052/2024',
    scope: 'License to Own and Operate Waste Treatment Plant in Iganga - Eastern Region',
    issueDate: '2024-03-01',
    expiryDate: '2027-03-01',
  },
  {
    _type: 'nemaLicense',
    _id: 'nema-storage',
    title: 'Hazardous Waste Storage License',
    number: 'ST047/2025',
    scope: 'Licensed facility for secure storage of hazardous waste materials',
    issueDate: '2025-08-01',
    expiryDate: '2028-08-01',
  },
  {
    _type: 'nemaLicense',
    _id: 'nema-transport-domestic',
    title: 'Non-Hazardous Waste Transport',
    number: 'TR076/2024',
    scope: 'License for transportation of non-hazardous and domestic waste materials',
    issueDate: '2024-05-01',
    expiryDate: '2026-05-01',
  },
  {
    _type: 'nemaLicense',
    _id: 'nema-transport-infectious',
    title: 'Infectious Substances Transport',
    number: 'TR077/2024',
    scope: 'License for transportation of infectious substances extremely hazardous to health',
    issueDate: '2024-05-01',
    expiryDate: '2026-05-01',
  },
  {
    _type: 'nemaLicense',
    _id: 'nema-transport-hazardous',
    title: 'Hazardous Waste Transport',
    number: 'TR078/2024',
    scope: 'License for transportation of hazardous waste materials and substances',
    issueDate: '2024-05-01',
    expiryDate: '2026-05-01',
  },
]

// ============================================================================
// FAQ CATEGORIES & ITEMS
// ============================================================================
const faqCategories = [
  { _type: 'faqCategory', _id: 'faq-cat-services', name: 'Services', icon: 'fa-cogs', order: 1 },
  { _type: 'faqCategory', _id: 'faq-cat-pricing', name: 'Pricing', icon: 'fa-tags', order: 2 },
  { _type: 'faqCategory', _id: 'faq-cat-environment', name: 'Environment', icon: 'fa-leaf', order: 3 },
  { _type: 'faqCategory', _id: 'faq-cat-support', name: 'Support', icon: 'fa-headset', order: 4 },
]

const faqItems = [
  // Services
  {
    _type: 'faqItem',
    _id: 'faq-services-1',
    question: 'What types of waste do you collect and manage?',
    answer: 'Green Label Services provides comprehensive waste management for various types of waste including: Medical Waste (Infectious waste, pathological waste, sharps, pharmaceutical waste), Oil and Gas Waste (Drilling mud, produced water, contaminated materials), Commercial Waste (Office waste, retail waste, restaurant waste), Industrial Waste (Manufacturing byproducts, chemical waste, equipment disposal), Hazardous Materials (Chemicals, batteries, electronic waste). Our specialized facilities in Iganga and Mbarara are equipped to handle different waste streams safely and in compliance with environmental regulations.',
    category: { _type: 'reference', _ref: 'faq-cat-services' },
    order: 1,
  },
  {
    _type: 'faqItem',
    _id: 'faq-services-2',
    question: 'Do you provide waste collection services across Uganda?',
    answer: 'Yes, we provide waste collection services throughout Uganda. Our primary facilities are located in: Iganga District, Eastern Uganda (Main facility with high-temperature incineration and comprehensive treatment capabilities), Mbarara, Western Uganda (Secondary facility with autoclave technology for non-burn treatment). We maintain a fleet of licensed medical waste transportation vehicles that can reach clients across the country. Our 24/7 presence ensures we\'re never far from your facility when you need assistance.',
    category: { _type: 'reference', _ref: 'faq-cat-services' },
    order: 2,
  },
  {
    _type: 'faqItem',
    _id: 'faq-services-3',
    question: 'How often can you collect our waste?',
    answer: 'We offer flexible collection schedules: Daily Collection (For high-volume generators), Weekly Collection (Most common), Bi-weekly Collection (Suitable for smaller practices), Monthly Collection (For low-volume generators), On-Demand Collection (Emergency or irregular pickup services).',
    category: { _type: 'reference', _ref: 'faq-cat-services' },
    order: 3,
  },
  // Pricing
  {
    _type: 'faqItem',
    _id: 'faq-pricing-1',
    question: 'How is your pricing structured?',
    answer: 'Our pricing is based on: Waste Volume, Waste Type, Collection Frequency, Location, Service Level. We provide detailed quotes with competitive rates and no hidden fees.',
    category: { _type: 'reference', _ref: 'faq-cat-pricing' },
    order: 1,
  },
  {
    _type: 'faqItem',
    _id: 'faq-pricing-2',
    question: 'Do you offer long-term contracts or discounts?',
    answer: 'Yes: Annual Contracts (up to 15% discount), Multi-year Contracts (Additional savings), Volume Discounts, Multiple Location Discounts, Early Payment Discounts (2% for payments within 10 days).',
    category: { _type: 'reference', _ref: 'faq-cat-pricing' },
    order: 2,
  },
  {
    _type: 'faqItem',
    _id: 'faq-pricing-3',
    question: 'What payment methods do you accept?',
    answer: 'Bank Transfers, Checks, Mobile Money (MTN Mobile Money and Airtel Money), Cash, Online Banking.',
    category: { _type: 'reference', _ref: 'faq-cat-pricing' },
    order: 3,
  },
  // Environment
  {
    _type: 'faqItem',
    _id: 'faq-env-1',
    question: 'How do you ensure environmentally safe waste disposal?',
    answer: 'Through Advanced Treatment Technologies (High-temperature incineration and autoclave), Emissions Control, Water Treatment (Comprehensive leachate treatment), Secure Landfilling, Regular Monitoring. All facilities operate under strict environmental permits and regular inspections.',
    category: { _type: 'reference', _ref: 'faq-cat-environment' },
    order: 1,
  },
  {
    _type: 'faqItem',
    _id: 'faq-env-2',
    question: 'Do you recycle materials from collected waste?',
    answer: 'Yes: Material Recovery, Metal Recovery, Plastic Processing, Energy Recovery, Circular Economy support. We process approximately 76,000 tonnes of recyclable waste annually.',
    category: { _type: 'reference', _ref: 'faq-cat-environment' },
    order: 2,
  },
  {
    _type: 'faqItem',
    _id: 'faq-env-3',
    question: 'What certifications and compliance standards do you maintain?',
    answer: 'NEMA Compliance, Ministry of Health Approval, ISO Standards (ISO 14001), International Best Practices (WHO guidelines), Regular Audits.',
    category: { _type: 'reference', _ref: 'faq-cat-environment' },
    order: 3,
  },
  // Support
  {
    _type: 'faqItem',
    _id: 'faq-support-1',
    question: 'How can I get started with your waste management services?',
    answer: 'Process: Initial Consultation (Contact: (256) 772 423 092 or greenlabel@greenlabel-services.com), Site Assessment, Custom Proposal, Service Agreement, Implementation. Timeline: 3-5 business days.',
    category: { _type: 'reference', _ref: 'faq-cat-support' },
    order: 1,
  },
  {
    _type: 'faqItem',
    _id: 'faq-support-2',
    question: 'What should I do in case of an emergency or urgent pickup?',
    answer: 'Call (256) 772 423 092, Same-Day Service (within 4-6 hours), Spill Response, Equipment Replacement, 24/7 Availability.',
    category: { _type: 'reference', _ref: 'faq-cat-support' },
    order: 2,
  },
  {
    _type: 'faqItem',
    _id: 'faq-support-3',
    question: 'Do you provide training for our staff?',
    answer: 'Yes: Waste Segregation Training, Safety Procedures, Regulatory Compliance, Emergency Procedures, Ongoing Support.',
    category: { _type: 'reference', _ref: 'faq-cat-support' },
    order: 3,
  },
  {
    _type: 'faqItem',
    _id: 'faq-support-4',
    question: 'How do I track my waste disposal and get certificates?',
    answer: 'Waste Tracking Forms, Certificates of Destruction, Online Portal, Regular Reports, Audit Trail. All documentation available digitally and in hard copy.',
    category: { _type: 'reference', _ref: 'faq-cat-support' },
    order: 4,
  },
]

// ============================================================================
// AWARDS
// ============================================================================
const awards = [
  {
    _type: 'award',
    _id: 'award-2023',
    title: 'East Africa Environmental Excellence Award',
    description: 'Recognized as the leading environmental services provider in East Africa for outstanding contribution to sustainable waste management and environmental protection initiatives.',
    year: '2023',
  },
  {
    _type: 'award',
    _id: 'award-2022',
    title: 'Uganda Business Excellence Award',
    description: 'Honored by the Uganda Chamber of Commerce for exceptional business practices, innovation in waste management, and significant contribution to Uganda\'s economic development.',
    year: '2022',
  },
  {
    _type: 'award',
    _id: 'award-2021',
    title: 'ISO 14001:2015 Environmental Management Certification',
    description: 'Successfully implemented and certified our Environmental Management System, demonstrating our commitment to reducing environmental impact and continuous improvement.',
    year: '2021',
  },
  {
    _type: 'award',
    _id: 'award-2020',
    title: 'COVID-19 Health Heroes Recognition',
    description: 'Awarded by the Ministry of Health for exceptional service in medical waste management during the COVID-19 pandemic, ensuring safe disposal of contaminated materials.',
    year: '2020',
  },
  {
    _type: 'award',
    _id: 'award-2019',
    title: 'Green Company of the Year',
    description: 'Recognized by NEMA for outstanding environmental stewardship and innovative recycling programs that reduced carbon footprint by 40%.',
    year: '2019',
  },
  {
    _type: 'award',
    _id: 'award-2018',
    title: 'Best Waste Management Service Provider',
    description: 'Winner of Uganda Industrial Excellence Awards for revolutionizing waste management practices and setting new industry standards for safety and efficiency.',
    year: '2018',
  },
]

// ============================================================================
// PROJECTS
// ============================================================================
const projects = [
  {
    _type: 'project',
    _id: 'project-uganda-smc',
    title: 'Uganda-SMC LTD',
    description: 'Comprehensive Waste Management for Oil Exploration',
    location: 'Albertine Graben',
    client: 'Uganda-SMC LTD',
  },
  {
    _type: 'project',
    _id: 'project-daqing',
    title: 'Daqing Oilfield Construction Group Co., Ltd',
    description: 'Drilling Waste Management',
    location: 'Lake Albert',
    client: 'Daqing Oilfield Construction Group Co., Ltd',
  },
  {
    _type: 'project',
    _id: 'project-cnooc',
    title: 'CNOOC Uganda Limited',
    description: 'Oil & Gas Waste Management',
    location: 'Lake Albert',
    client: 'CNOOC Uganda Limited',
  },
  {
    _type: 'project',
    _id: 'project-china-state',
    title: 'China State Construction Engineering Company Ltd',
    description: 'Oil & Gas Waste Management',
    location: 'Multiple Sites',
    client: 'China State Construction Engineering Company Ltd',
  },
  {
    _type: 'project',
    _id: 'project-excel',
    title: 'Excel Construction Ltd',
    description: 'Oil & Gas Waste Management',
    location: 'Western Uganda',
    client: 'Excel Construction Ltd',
  },
  {
    _type: 'project',
    _id: 'project-karmod',
    title: 'Karmod Beta',
    description: 'Oil & Gas Waste Management',
    location: 'Albertine Region',
    client: 'Karmod Beta',
  },
  {
    _type: 'project',
    _id: 'project-gcc',
    title: 'GCC Services',
    description: 'Oil & Gas Waste Management',
    location: 'Albertine Graben',
    client: 'GCC Services',
  },
  {
    _type: 'project',
    _id: 'project-mantrac',
    title: 'Mantrac CAT',
    description: 'Oil & Gas Waste Management',
    location: 'Albertine Graben',
    client: 'Mantrac CAT',
  },
  {
    _type: 'project',
    _id: 'project-usaid',
    title: 'USAID',
    description: 'Medical & Hazardous Waste Management across 705 facilities nationwide',
    location: 'Nationwide',
    client: 'USAID',
  },
  {
    _type: 'project',
    _id: 'project-unda',
    title: 'Uganda National Drug Authority (UNDA)',
    description: 'Healthcare Waste Management',
    location: 'Uganda',
    client: 'Uganda National Drug Authority',
  },
  {
    _type: 'project',
    _id: 'project-nms',
    title: 'National Medical Stores (NMS)',
    description: 'Healthcare Waste Management',
    location: 'Uganda',
    client: 'National Medical Stores',
  },
  {
    _type: 'project',
    _id: 'project-unbs',
    title: 'Uganda National Bureau of Standards (UNBS)',
    description: 'Industrial Waste Management',
    location: 'Uganda',
    client: 'Uganda National Bureau of Standards',
  },
  {
    _type: 'project',
    _id: 'project-abt',
    title: 'ABT Associates Inc.',
    description: 'Assorted Waste Management',
    location: 'Uganda',
    client: 'ABT Associates Inc.',
  },
  {
    _type: 'project',
    _id: 'project-cardno',
    title: 'Cardno',
    description: 'Medical Waste Management across 59 selected districts',
    location: '59 Selected Districts',
    client: 'Cardno',
  },
  {
    _type: 'project',
    _id: 'project-egpaf',
    title: 'Elizabeth Glaser Pediatric AIDS Foundation',
    description: 'Medical Waste Management',
    location: 'Uganda',
    client: 'Elizabeth Glaser Pediatric AIDS Foundation',
  },
  {
    _type: 'project',
    _id: 'project-kcca',
    title: 'KCCA',
    description: 'Medical Waste Management for Kampala City Health Centres',
    location: 'Kampala',
    client: 'Kampala Capital City Authority',
  },
  {
    _type: 'project',
    _id: 'project-jsi',
    title: 'John Snow Inc. (JSI)',
    description: 'Medical Waste Management across 85 selected districts',
    location: '85 Selected Districts',
    client: 'John Snow Inc.',
  },
  {
    _type: 'project',
    _id: 'project-aidstar',
    title: 'USAID AIDSTAR-One',
    description: 'Medical Waste Management in Eastern Uganda',
    location: 'Eastern Uganda',
    client: 'USAID AIDSTAR-One',
  },
  {
    _type: 'project',
    _id: 'project-chai',
    title: 'Clinton Health Access Initiative',
    description: 'Medical Waste Management',
    location: 'Nationwide',
    client: 'Clinton Health Access Initiative',
  },
  {
    _type: 'project',
    _id: 'project-balton',
    title: 'Balton Uganda',
    description: 'Oil & Gas Waste Management',
    location: 'Western Region',
    client: 'Balton Uganda',
  },
  {
    _type: 'project',
    _id: 'project-moh',
    title: 'Ministry of Health',
    description: 'Medical Waste Management - Expired medicines disposal',
    location: 'Uganda',
    client: 'Ministry of Health',
  },
]

// ============================================================================
// CMS PAGES (privacy, terms, eco, qehs-policy, etc.)
// ============================================================================
const cmsPages = [
  {
    _type: 'page',
    _id: 'page-privacy',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy' },
    hero: {
      _type: 'hero',
      heading: 'Privacy Policy',
      subheading: 'How we collect, use, and protect your personal information.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Privacy Policy',
      metaDescription: 'Learn how Green Label Services collects, uses, and protects your personal information in compliance with Uganda\'s Data Protection and Privacy Act 2019.',
    },
  },
  {
    _type: 'page',
    _id: 'page-terms',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms' },
    hero: {
      _type: 'hero',
      heading: 'Terms of Service',
      subheading: 'Terms and conditions governing the use of our services.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Terms of Service',
      metaDescription: 'Read the terms and conditions for using Green Label Services waste management solutions in Uganda.',
    },
  },
  {
    _type: 'page',
    _id: 'page-eco',
    title: 'Eco-Friendly Practices',
    slug: { _type: 'slug', current: 'eco' },
    hero: {
      _type: 'hero',
      heading: 'Eco-Friendly Practices',
      subheading: 'Our commitment to environmental sustainability and green initiatives.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Eco-Friendly Practices',
      metaDescription: 'Discover Green Label Services\' eco-friendly waste management practices, recycling programs, and sustainability initiatives in Uganda.',
    },
  },
  {
    _type: 'page',
    _id: 'page-qehs-policy',
    title: 'QEHS Policy',
    slug: { _type: 'slug', current: 'qehs-policy' },
    hero: {
      _type: 'hero',
      heading: 'Quality, Environment, Health & Safety Policy',
      subheading: 'Our integrated management system for quality, environmental protection, and occupational health & safety.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'QEHS Policy',
      metaDescription: 'Green Label Services Quality, Environment, Health & Safety policy framework ensuring ISO-compliant waste management operations.',
    },
  },
  {
    _type: 'page',
    _id: 'page-fleet',
    title: 'Our Fleet',
    slug: { _type: 'slug', current: 'fleet' },
    hero: {
      _type: 'hero',
      heading: 'Our Fleet',
      subheading: 'A modern fleet of specialized vehicles for safe waste collection and transportation across Uganda.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Our Fleet',
      metaDescription: 'Explore Green Label Services\' fleet of 30+ specialized waste collection and transportation vehicles serving all of Uganda.',
    },
  },
  {
    _type: 'page',
    _id: 'page-finances',
    title: 'Financial Overview',
    slug: { _type: 'slug', current: 'finances' },
    hero: {
      _type: 'hero',
      heading: 'Financial Overview',
      subheading: 'Transparent financial reporting and sustainable business growth.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Financial Overview',
      metaDescription: 'Green Label Services financial overview, sustainable growth trajectory, and commitment to transparent business practices.',
    },
  },
  {
    _type: 'page',
    _id: 'page-safety',
    title: 'Safety Standards',
    slug: { _type: 'slug', current: 'safety' },
    hero: {
      _type: 'hero',
      heading: 'Safety Standards',
      subheading: 'Rigorous safety protocols protecting our employees, clients, and communities.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Safety Standards',
      metaDescription: 'Learn about Green Label Services\' comprehensive safety standards, protocols, and certifications for waste management operations.',
    },
  },
  {
    _type: 'page',
    _id: 'page-infrastructure',
    title: 'Infrastructure',
    slug: { _type: 'slug', current: 'infrastructure' },
    hero: {
      _type: 'hero',
      heading: 'Our Infrastructure',
      subheading: 'State-of-the-art waste treatment facilities and operational infrastructure.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Infrastructure',
      metaDescription: 'Explore Green Label Services\' waste treatment facilities in Iganga and Mbarara, featuring incineration and autoclave technologies.',
    },
  },
  {
    _type: 'page',
    _id: 'page-community',
    title: 'Community Engagement',
    slug: { _type: 'slug', current: 'community' },
    hero: {
      _type: 'hero',
      heading: 'Community Engagement',
      subheading: 'Building partnerships and empowering communities through environmental education.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Community Engagement',
      metaDescription: 'Green Label Services community engagement programs, environmental education initiatives, and social responsibility efforts in Uganda.',
    },
  },
  {
    _type: 'page',
    _id: 'page-press-releases',
    title: 'Press Releases',
    slug: { _type: 'slug', current: 'press-releases' },
    hero: {
      _type: 'hero',
      heading: 'Press Releases',
      subheading: 'Latest news and media coverage about Green Label Services.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Press Releases',
      metaDescription: 'Read the latest press releases and media coverage about Green Label Services\' waste management operations in Uganda.',
    },
  },
  {
    _type: 'page',
    _id: 'page-human-resources',
    title: 'Human Resources',
    slug: { _type: 'slug', current: 'human-resources' },
    hero: {
      _type: 'hero',
      heading: 'Human Resources',
      subheading: 'Our people-first approach to building a skilled and motivated workforce.',
      variant: 'centered',
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Human Resources',
      metaDescription: 'Learn about Green Label Services\' human resources policies, employee development programs, and career opportunities.',
    },
  },
]

// ============================================================================
// SEED FUNCTION
// ============================================================================
async function seed() {
  console.log('Starting Sanity content seed...\n')

  const allDocuments = [
    ...teamMembers,
    ...milestones,
    ...nemaLicenses,
    ...faqCategories,
    ...faqItems,
    ...awards,
    ...projects,
    ...cmsPages,
  ]

  console.log(`Total documents to create: ${allDocuments.length}\n`)

  let created = 0
  let skipped = 0
  let errors = 0

  for (const doc of allDocuments) {
    try {
      // Use createIfNotExists to avoid duplicates on re-run
      await client.createIfNotExists(doc)
      created++
      console.log(`  ✓ ${doc._type}: ${(doc as { title?: string; name?: string; question?: string }).title || (doc as { name?: string }).name || (doc as { question?: string }).question || doc._id}`)
    } catch (err) {
      const existing = err instanceof Error && err.message.includes('already exists')
      if (existing) {
        skipped++
        console.log(`  → Skipped (exists): ${doc._id}`)
      } else {
        errors++
        console.error(`  ✗ Error creating ${doc._id}:`, err instanceof Error ? err.message : err)
      }
    }
  }

  console.log(`\nSeed complete:`)
  console.log(`  Created: ${created}`)
  console.log(`  Skipped: ${skipped}`)
  console.log(`  Errors: ${errors}`)
  console.log(`  Total: ${allDocuments.length}`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
