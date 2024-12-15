import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: "sitename",
      label: "Site name",
      type: "text",
      required: true,
      defaultValue: "Wiki"
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
      defaultValue: "A customizable knowledge base."
    },
    {
      name: "disclaimer",
      type: "textarea",
      required: true,
      defaultValue: "This platform provides general information for reference purposes. Content may vary based on customization. All rights reserved."
    }
  ],
}