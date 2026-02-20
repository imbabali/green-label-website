import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nemaLicense',
  title: 'NEMA License',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'License Number',
      type: 'string',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    }),
    defineField({
      name: 'image',
      title: 'License Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'number',
      media: 'image',
    },
  },
})
