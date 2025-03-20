import { LucidRow } from '@adonisjs/lucid/types/model'
import { TaxonomyCms, TaxonomyCmsIdentifier } from '../../dto/taxonomy/taxonomy.js'
import Taxonomy from '#models/taxonomy'

export class AllTAxonomiesCmsModel {
  constructor(private taxonomies: TaxonomyCms[]) {}

  static fromArray<Model extends LucidRow>(model: Model[]) {
    return model.map(
      (item) =>
        TaxonomyCms.create({
          id: TaxonomyCmsIdentifier.fromString(item.id),
          name: item.name,
        }).props
    )
  }
}
