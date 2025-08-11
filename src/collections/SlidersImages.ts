import { CollectionConfig } from 'payload/'
import SliderImages from '../components/payload/MediaMultiSelect'

export const SlidersImages: CollectionConfig = {
  slug: 'sliders-images',
  admin: {
    group: 'الصفحة الرئيسية',
    defaultColumns: ['sliderImages'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
  },

  fields: [
    {
      name: 'sliderImages',
      label: 'صور السلايدر',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        components: {
          Field: SliderImages,
        },
      },
    },
  ],
}
