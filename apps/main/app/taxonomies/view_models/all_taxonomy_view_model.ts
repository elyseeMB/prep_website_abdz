import { Taxonomy } from '../domain/taxonomy.js'

export class AllTaxonomyViewModel {
  constructor(protected taxonomies: Taxonomy[]) {}

  static fromDomain(taxonomies: Taxonomy[]) {
    return new this(taxonomies)
  }

  serialize() {
    return this.taxonomies.map((taxonomy) => ({
      id: taxonomy.getIdentifier().toString(),
      name: taxonomy.props.name,
      slug: taxonomy.props.slug,
    }))
  }
}
