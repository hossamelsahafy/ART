import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'الصورة',
    plural: 'الصور',
  },
  upload: true,
  fields: [],
  access: {
    read: ({ req }) => true, // Only admins can read
    create: ({ req }) => req.user?.role === 'admin', // Only admins can create
    update: ({ req }) => req.user?.role === 'admin', // Only admins can update
    delete: ({ req }) => req.user?.role === 'admin', // Only admins can delete
  },
  admin: {
    hidden: ({ user }) => user?.role != 'admin', // Hides the collection from the admin panel
  },
}
