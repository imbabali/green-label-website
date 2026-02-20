import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'jobCategory' }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Kampala, Uganda"',
    }),
    defineField({
      name: 'isRemote',
      title: 'Remote',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full Time', value: 'full_time' },
          { title: 'Part Time', value: 'part_time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
          { title: 'Temporary', value: 'temporary' },
        ],
      },
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Level', value: 'entry' },
          { title: 'Mid Level', value: 'mid' },
          { title: 'Senior Level', value: 'senior' },
          { title: 'Executive', value: 'executive' },
        ],
      },
    }),
    defineField({
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'object',
      fields: [
        {
          name: 'min',
          type: 'number',
          title: 'Minimum Salary',
        },
        {
          name: 'max',
          type: 'number',
          title: 'Maximum Salary',
        },
        {
          name: 'currency',
          type: 'string',
          title: 'Currency',
          initialValue: 'UGX',
        },
        {
          name: 'isVisible',
          type: 'boolean',
          title: 'Show Salary',
          description: 'Display salary range publicly.',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for job listing cards. Max 300 characters.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'blockContent',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'blockContent',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'blockContent',
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display order. Higher numbers appear first.',
      initialValue: 0,
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      jobType: 'jobType',
    },
    prepare({ title, location, jobType }) {
      const typeLabels: Record<string, string> = {
        full_time: 'Full Time',
        part_time: 'Part Time',
        contract: 'Contract',
        internship: 'Internship',
        temporary: 'Temporary',
      }
      const parts = [location, jobType ? typeLabels[jobType] || jobType : null]
        .filter(Boolean)
        .join(' | ')
      return {
        title: title || 'Untitled Job',
        subtitle: parts || 'No details',
      }
    },
  },
})
