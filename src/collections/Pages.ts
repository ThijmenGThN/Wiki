import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import slugify from 'slugify'

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
}) => {
  data.slug = slugify(data.title, { lower: true })
  return data
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({data}) => `http://localhost:3000/${data.category.slug}/${data.slug}`
    }
  },
  hooks: {
    beforeChange: [beforeChangeHook]
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      }
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}

