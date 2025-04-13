import Taxonomy from '#models/taxonomy'
import db from '@adonisjs/lucid/services/db'

export default class UpdateTaxonomy {
  static async byId(id: number, data: any) {
    const taxonomy = await Taxonomy.findOrFail(id)
    await this.#update(taxonomy, data)
    return taxonomy
  }

  static async handle(taxonomy: Taxonomy, data: any) {
    await this.#update(taxonomy, data)
    return taxonomy
  }

  static async #update(taxonomy: Taxonomy, data: any) {
    const { ...updata } = data

    taxonomy.merge(updata)

    return await db.transaction(async (trx) => {
      taxonomy.useTransaction(trx)

      await taxonomy.save()

      return taxonomy
    })
  }
}
