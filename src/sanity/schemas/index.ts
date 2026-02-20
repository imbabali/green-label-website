import type { SchemaTypeDefinition } from 'sanity'

// Object schemas
import seo from './objects/seo'
import blockContent from './objects/blockContent'
import ctaButton from './objects/ctaButton'
import hero from './objects/hero'

// Document schemas
import blogPost from './documents/blogPost'
import blogCategory from './documents/blogCategory'
import blogTag from './documents/blogTag'
import service from './documents/service'
import serviceCategory from './documents/serviceCategory'
import job from './documents/job'
import jobCategory from './documents/jobCategory'
import page from './documents/page'
import teamMember from './documents/teamMember'
import companyMilestone from './documents/companyMilestone'
import nemaLicense from './documents/nemaLicense'
import galleryImage from './documents/galleryImage'
import faqCategory from './documents/faqCategory'
import faqItem from './documents/faqItem'
import award from './documents/award'
import project from './documents/project'

const schemas: SchemaTypeDefinition[] = [
  // Objects
  seo,
  blockContent,
  ctaButton,
  hero,

  // Documents
  blogPost,
  blogCategory,
  blogTag,
  service,
  serviceCategory,
  job,
  jobCategory,
  page,
  teamMember,
  companyMilestone,
  nemaLicense,
  galleryImage,
  faqCategory,
  faqItem,
  award,
  project,
]

export default schemas
