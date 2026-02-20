export const SERVICE_TYPES = [
  { value: 'medical_waste', label: 'Medical Waste Management' },
  { value: 'oil_gas_waste', label: 'Oil & Gas Waste Management' },
  { value: 'liquid_waste', label: 'Liquid Waste Management' },
  { value: 'retail_waste', label: 'Retail Waste Management' },
  { value: 'equipment_supply', label: 'Equipment Supply' },
  { value: 'training', label: 'Training & Consultation' },
  { value: 'logistics', label: 'Transport & Logistics' },
  { value: 'consulting', label: 'Environmental Consulting' },
  { value: 'other', label: 'Other Services' },
] as const

export type ServiceType = (typeof SERVICE_TYPES)[number]['value']

export const SERVICE_TYPE_MAP = Object.fromEntries(
  SERVICE_TYPES.map((s) => [s.value, s.label])
) as Record<ServiceType, string>

export const FREQUENCY_OPTIONS = [
  { value: 'one_time', label: 'One-Time Service' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'as_needed', label: 'As Needed' },
  { value: 'emergency', label: 'Emergency' },
] as const

export const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent (ASAP)' },
  { value: 'this_week', label: 'This Week' },
  { value: 'within_month', label: 'Within a Month' },
  { value: 'next_quarter', label: 'Next Quarter' },
  { value: 'planning_stage', label: 'Planning Stage' },
] as const

export const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'services', label: 'Service Information' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'careers', label: 'Careers' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'media', label: 'Media Inquiry' },
  { value: 'other', label: 'Other' },
] as const

export const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'both', label: 'Both Email & Phone' },
] as const

export const JOB_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'temporary', label: 'Temporary' },
] as const

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
] as const

export const NEWSLETTER_FREQUENCIES = [
  { value: 'D', label: 'Daily' },
  { value: 'W', label: 'Weekly' },
  { value: 'M', label: 'Monthly' },
] as const

export const RATING_OPTIONS = [
  { value: 5, label: '5 Stars - Excellent' },
  { value: 4, label: '4 Stars - Very Good' },
  { value: 3, label: '3 Stars - Good' },
  { value: 2, label: '2 Stars - Fair' },
  { value: 1, label: '1 Star - Poor' },
] as const
