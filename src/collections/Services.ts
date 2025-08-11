import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true, // Allow public read access
    create: () => false,
    delete: () => false,
  },
  labels: {
    singular: 'الخدمة',
    plural: 'الخدمات',
  },
  admin: {
    useAsTitle: 'titleAr', // Display English title in the admin panel
    group: 'الصفحة الرئيسية',
  },
  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media', // Assuming you have a media collection for icons
      required: true,
      label: 'الصورة',
    },
    {
      name: 'titleAr',
      type: 'text',
      label: 'الاسم بالعربية',
      required: true,
    },
    {
      name: 'titleEn',
      type: 'text',
      label: 'الاسم بالانجليزية',
      required: true,
    },
    {
      name: 'descriptionAr',
      type: 'textarea',
      label: 'الوصف بالعربية',
      required: true,
    },
    {
      name: 'descriptionEn',
      type: 'textarea',
      label: 'الوصف بالانجليزية',
      required: true,
    },
  ],
}
