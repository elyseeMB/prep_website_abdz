import ModelTaxonomy from '#models/taxonomy'
import TaxonomyBuilder from '../builder/taxonomy_builder.js'
import { Taxonomy } from './taxonomy.js'
import { TaxonomyIdentifier } from './taxonomy_identifier.js'

export class TaxonomyTransformer {
  constructor(private taxonomies: TaxonomyBuilder) {}

  static fromDomain(taxonomies: TaxonomyBuilder) {
    return new this(taxonomies)
  }

  async serialize() {
    const collections = await this.taxonomies.query.exec()
    return collections.map((taxonomies) => {
      return this.toDomain(taxonomies)
    })
  }

  toDomain(taxonomy: ModelTaxonomy) {
    return Taxonomy.create({
      id: TaxonomyIdentifier.fromString(taxonomy.id.toString()),
      name: taxonomy.name,
      slug: taxonomy.slug,
    })
  }
}
