import { CollectionConfig } from 'payload'
import SlidersImage from '../components/payload/MediaMultiSelect'

export const SlidersImages: CollectionConfig = {
  slug: 'sliders-images',
  label: 'صور السلايدر',
  admin: {
    group: 'الصفحة الرئيسية',
  },
  access: {
    read: () => true,
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
          Field: SlidersImage,
        },
      },
    },
    // {
    //   name: 'partners',
    //   label: 'صور الشركاء',
    //   type: 'relationship',
    //   relationTo: 'media',
    //   hasMany: true,
    //   admin: {
    //     components: {
    //       Field: MediaMultiSelect,
    //     },
    //   },
    // },
  ],
}
