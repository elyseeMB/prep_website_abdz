import db from '@adonisjs/lucid/services/db'
import { Taxonomy } from '../domain/taxonomy.js'
import { TaxonomyIdentifier } from '../domain/taxonomy_identifier.js'
import TaxonomyBuilder from '../builder/taxonomy_builder.js'
import TaxonomyModel from '#models/taxonomy'

export class TaxonomyRepository {
  builder() {
    return TaxonomyBuilder.new()
  }

  async all() {
    const TaxonomyRecords = await db
      .from('taxonomies')
      .select(['id', 'name'])
      .orderBy('name')
      .exec()

    return TaxonomyRecords.map((taxonomyRecord) => {
      return Taxonomy.create({
        id: TaxonomyIdentifier.fromString(taxonomyRecord.id),
        name: taxonomyRecord.name,
      })
    })
  }

  getBySlug(slug: string) {
    return this.builder().display().where('slug', slug).firstOrFail()
  }

  getChildren(taxonomy: TaxonomyModel) {
    return this.builder().where('parent_id', taxonomy.id).display().order()
  }

  getList() {
    return this.builder().display().order()
  }
}
