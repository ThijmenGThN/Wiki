import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    livePreview: {
      url: 'http://localhost:3000',
    },
  },
  fields: [
    {
      name: "sitename",
      label: "Site name",
      type: "text",
      required: true,
      defaultValue: "Wiki"
    },
    {
      name: "about",
      type: "text",
      required: true,
      defaultValue: "A customizable knowledge base."
    },
    {
      name: "disclaimer",
      type: "text",
      required: true,
      defaultValue: "This platform provides general information for reference purposes. Content may vary based on customization. All rights reserved."
    }
  ],
}