import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true, // Allow public read access
    create: () => false,
    delete: () => false,
  },
  labels: {
    singular: 'التصنيف',
    plural: 'التصنيفات',
  },
  admin: {
    useAsTitle: 'titleAr', // Display English title in the admin panel
    group: 'ادارة المنتجات',
  },
  fields: [
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media', // Assuming you have a media collection for storing images
      required: true,
      label: 'صورة التصنيف',
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
      name: 'sort',
      type: 'number',
      label: 'الترتيب',
      required: true,
      defaultValue: 0,
      unique: true,
    },
  ],
}
