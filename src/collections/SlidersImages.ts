import { GlobalConfig } from 'payload/'
import SliderImages from '../components/payload/MediaMultiSelect'
import PartnersImages from '../components/payload/Partners'

export const SlidersImages: GlobalConfig = {
  slug: 'sliders-images',
  admin: {
    group: 'الصفحة الرئيسية',
  },
  hooks: {
    afterChange: [
      (args) => {
        console.log(args.doc)
      },
    ],
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
    {
      name: 'partners',
      type: 'relationship',
      label: 'شركاء النجاح',
      relationTo: 'media',
      hasMany: true,
      admin: {
        components: {
          Field: PartnersImages,
        },
      },
    },
  ],
}
