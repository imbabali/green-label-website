import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order within category. Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      categoryName: 'category.name',
    },
    prepare({ title, categoryName }) {
      return {
        title: title || 'Untitled Question',
        subtitle: categoryName || 'No category',
      }
    },
  },
})
