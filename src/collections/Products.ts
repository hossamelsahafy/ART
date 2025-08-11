import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true, // Allow public read access
  },
  labels: {
    singular: 'المنتج',
    plural: 'المنتجات',
  },
  admin: {
    useAsTitle: 'descriptionAr', // Display English description in the admin panel
    group: 'ادارة المنتجات',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'صور المنتج',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media', // Assuming images are stored in a media collection
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // Assuming categories are stored in a categories collection
      label: 'التصنيف',
    },
    {
      name: 'descriptionAr',
      type: 'textarea',
      label: 'االوصف بالعربية',
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
