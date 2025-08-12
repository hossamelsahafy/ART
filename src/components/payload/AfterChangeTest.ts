import type { CollectionAfterChangeHook } from 'payload'

const afterChangeHook: CollectionAfterChangeHook = async ({ doc }) => {
  return doc
}

export default afterChangeHook
