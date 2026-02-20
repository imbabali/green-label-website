import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemas from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'green-label-services',
  title: 'Green Label Services CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
})
