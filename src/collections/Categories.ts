import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import slugify from 'slugify'

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
}) => {
  data.slug = slugify(data.title, { lower: true })
  return data
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
      name: 'subtitle',
      type: 'text',
      required: true,
    },
  ],
}
