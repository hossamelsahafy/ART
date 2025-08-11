import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'المستخدم',
    plural: 'المستخدمين',
  },
  auth: true, // Ensures authentication is enabled
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Only admins can read
    create: ({ req }) => req.user?.role === 'admin', // Only admins can create
    update: ({ req }) => req.user?.role === 'admin', // Only admins can update
    delete: ({ req }) => req.user?.role === 'admin', // Only admins can delete
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'الصلاحيات',
      options: [
        { label: 'ادمن', value: 'admin' },
        { label: 'موظف', value: 'employee' },
      ],
      defaultValue: 'employee',
      required: true,
    },
  ],
}
