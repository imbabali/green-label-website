import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Font Awesome icon class.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order. Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'order',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle !== undefined ? `Order: ${subtitle}` : '',
      }
    },
  },
})
