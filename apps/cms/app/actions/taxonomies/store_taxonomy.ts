import Taxonomy from '#models/taxonomy'
import db from '@adonisjs/lucid/services/db'
import { sortUserPlugins } from 'vite'

type TaxonomyParams = {
  parentId: number
  rootParentId: number
  name: string
  slug: string
  description: string
}

type Params = {
  data: TaxonomyParams
}

export default class StoreTaxonomy {
  static async handle({ data }: Params) {
    const { ...store } = data

    return db.transaction(async (trx) => {
      const taxonomy = await Taxonomy.create(
        {
          ...store,
        },
        { client: trx }
      )
      return taxonomy
    })
  }
}
