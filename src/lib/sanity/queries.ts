// =============================================================================
// GROQ Queries for Green Label Services
// =============================================================================

// -----------------------------------------------------------------------------
// Home Page
// -----------------------------------------------------------------------------

export const homePageQuery = /* groq */ `{
  "featuredServices": *[_type == "service" && isFeatured == true && status == "active"] | order(priority desc) [0...6] {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    icon,
    category->{name, slug}
  },
  "latestPosts": *[_type == "blogPost" && status == "published"] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{name, slug},
    author->{name, photo}
  },
  "featuredPosts": *[_type == "blogPost" && status == "published" && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{name, slug},
    author->{name, photo}
  },
  "nemaLicenses": *[_type == "nemaLicense"] | order(_createdAt desc) {
    _id,
    title,
    number,
    scope,
    issueDate,
    expiryDate,
    image
  },
  "executiveTeam": *[_type == "teamMember" && isExecutive == true] | order(_createdAt asc) {
    _id,
    name,
    role,
    photo,
    bio,
    socialLinks
  }
}`

// -----------------------------------------------------------------------------
// Blog
// -----------------------------------------------------------------------------

export const blogListQuery = /* groq */ `{
  "posts": *[_type == "blogPost" && status == "published"
    && ($category == "" || category->slug.current == $category)
    && ($tag == "" || $tag in tags[]->slug.current)
    && ($search == "" || title match $search || excerpt match $search)
  ] | order(isSticky desc, publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    postType,
    isFeatured,
    isSticky,
    category->{name, slug},
    author->{name},
    tags[]->{name, slug}
  },
  "total": count(*[_type == "blogPost" && status == "published"
    && ($category == "" || category->slug.current == $category)
    && ($tag == "" || $tag in tags[]->slug.current)
    && ($search == "" || title match $search || excerpt match $search)
  ])
}`

export const blogPostQuery = /* groq */ `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  gallery,
  publishedAt,
  postType,
  status,
  isFeatured,
  isSticky,
  seo,
  author->{
    _id,
    name,
    role,
    photo,
    bio,
    socialLinks
  },
  category->{
    _id,
    name,
    slug,
    color
  },
  tags[]->{
    _id,
    name,
    slug
  },
  "relatedPosts": *[_type == "blogPost" && status == "published" && category._ref == ^.category._ref && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{name, slug},
    author->{name}
  },
  "previousPost": *[_type == "blogPost" && status == "published" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0] {
    title,
    slug
  },
  "nextPost": *[_type == "blogPost" && status == "published" && publishedAt > ^.publishedAt] | order(publishedAt asc) [0] {
    title,
    slug
  }
}`

export const blogCategoriesQuery = /* groq */ `*[_type == "blogCategory" && isActive == true] | order(order asc) {
  _id,
  name,
  slug,
  description,
  icon,
  color,
  "postCount": count(*[_type == "blogPost" && status == "published" && category._ref == ^._id])
}`

export const blogTagsQuery = /* groq */ `*[_type == "blogTag"] | order(name asc) {
  _id,
  name,
  slug,
  "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
}`

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

export const serviceListQuery = /* groq */ `*[_type == "service" && status == "active"] | order(priority desc) {
  _id,
  title,
  slug,
  shortDescription,
  featuredImage,
  icon,
  isFeatured,
  features,
  category->{name, slug}
}`

export const serviceDetailQuery = /* groq */ `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  features,
  benefits,
  serviceAreas,
  featuredImage,
  icon,
  status,
  isFeatured,
  contactEmail,
  contactPhone,
  seo,
  category->{
    _id,
    name,
    slug
  },
  gallery[] {
    _key,
    asset->{_id, url},
    alt,
    caption
  },
  faqs[] {
    _key,
    question,
    answer
  },
  "relatedServices": *[_type == "service" && status == "active" && category._ref == ^.category._ref && slug.current != $slug] | order(priority desc) [0...3] {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    icon,
    category->{name, slug}
  }
}`

export const serviceCategoriesQuery = /* groq */ `*[_type == "serviceCategory"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  icon
}`

// -----------------------------------------------------------------------------
// Jobs / Careers
// -----------------------------------------------------------------------------

export const jobListQuery = /* groq */ `*[_type == "job" && isActive == true
  && ($category == "" || category->slug.current == $category)
  && ($jobType == "" || jobType == $jobType)
  && ($experienceLevel == "" || experienceLevel == $experienceLevel)
  && ($isRemote == null || isRemote == $isRemote)
  && ($search == "" || title match $search || shortDescription match $search)
] | order(isFeatured desc, priority desc, _createdAt desc) {
  _id,
  title,
  slug,
  location,
  isRemote,
  jobType,
  experienceLevel,
  salaryRange,
  shortDescription,
  applicationDeadline,
  isFeatured,
  department,
  category->{name, slug, color}
}`

export const jobDetailQuery = /* groq */ `*[_type == "job" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  location,
  isRemote,
  jobType,
  experienceLevel,
  salaryRange,
  shortDescription,
  responsibilities,
  requirements,
  benefits,
  applicationDeadline,
  isActive,
  isFeatured,
  department,
  seo,
  category->{
    _id,
    name,
    slug,
    color
  },
  "relatedJobs": *[_type == "job" && isActive == true && category._ref == ^.category._ref && slug.current != $slug] | order(isFeatured desc, priority desc) [0...3] {
    _id,
    title,
    slug,
    location,
    jobType,
    category->{name, slug}
  }
}`

// -----------------------------------------------------------------------------
// Pages
// -----------------------------------------------------------------------------

export const pageQuery = /* groq */ `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  hero,
  content,
  seo
}`

// -----------------------------------------------------------------------------
// Team Members
// -----------------------------------------------------------------------------

export const teamMembersQuery = /* groq */ `*[_type == "teamMember"] | order(isExecutive desc, _createdAt asc) {
  _id,
  name,
  role,
  photo,
  bio,
  expertiseTags,
  socialLinks,
  isExecutive
}`

// -----------------------------------------------------------------------------
// Company Milestones
// -----------------------------------------------------------------------------

export const milestonesQuery = /* groq */ `*[_type == "companyMilestone"] | order(year asc) {
  _id,
  year,
  icon,
  title,
  description,
  image
}`

// -----------------------------------------------------------------------------
// FAQs
// -----------------------------------------------------------------------------

export const faqsQuery = /* groq */ `*[_type == "faqItem"] | order(category->order asc, order asc) {
  _id,
  question,
  answer,
  order,
  category->{
    _id,
    name,
    icon,
    order
  }
}`

// -----------------------------------------------------------------------------
// Gallery
// -----------------------------------------------------------------------------

export const galleryQuery = /* groq */ `*[_type == "galleryImage"] | order(_createdAt desc) {
  _id,
  image,
  caption,
  category,
  service->{
    _id,
    title,
    slug
  }
}`

// -----------------------------------------------------------------------------
// Awards
// -----------------------------------------------------------------------------

export const awardsQuery = /* groq */ `*[_type == "award"] | order(year desc) {
  _id,
  title,
  description,
  year,
  image
}`

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

export const projectsQuery = /* groq */ `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  image,
  location,
  client,
  slug
}`
