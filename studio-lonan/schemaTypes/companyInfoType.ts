import {defineField, defineType} from 'sanity'

export const companyInfoType = defineType({
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name (Arabic)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyNameEn',
      title: 'Company Name (English)',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'taglineEn',
      title: 'Tagline (English)',
      type: 'string',
    }),
    defineField({
      name: 'about',
      title: 'About (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'aboutEn',
      title: 'About (English)',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'visionEn',
      title: 'Vision (English)',
      type: 'text',
    }),
    defineField({
      name: 'mission',
      title: 'Mission (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'missionEn',
      title: 'Mission (English)',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Light Version)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'phone1',
      title: 'Phone Number 1',
      type: 'string',
    }),
    defineField({
      name: 'phone2',
      title: 'Phone Number 2',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (English)',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'snapchat', type: 'url', title: 'Snapchat'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'twitter', type: 'url', title: 'Twitter/X'},
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'tiktok', type: 'url', title: 'TikTok'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      media: 'logo',
    },
  },
})

