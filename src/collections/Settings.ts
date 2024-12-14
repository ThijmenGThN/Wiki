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
        name: "motto",
        type: "text",
        required: true,
        defaultValue: "Maintained by Thijmen Heuvelink"
    },
    {
        name: "disclaimer",
        type: "text",
        required: true,
        defaultValue: "This knowledge base serves as a valuable tool to simplify installations troubleshoot common problems and enhance the overall developer experience all rights reserved."
    },
  ],
}