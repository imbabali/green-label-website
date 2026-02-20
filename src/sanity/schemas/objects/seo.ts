import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines. Max 60 characters.',
      validation: (rule) => rule.max(60).warning('Meta title should be under 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines. Max 160 characters.',
      validation: (rule) => rule.max(160).warning('Meta description should be under 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing. Recommended 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword this page should rank for.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'If enabled, search engines will not index this page.',
      initialValue: false,
    }),
  ],
})
