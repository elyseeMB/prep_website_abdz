import Taxonomy from '#models/taxonomy'
import { BaseBuilder } from '../../builder/base_builder.js'

export default class TaxonomyBuilder extends BaseBuilder<typeof Taxonomy, Taxonomy> {
  constructor() {
    super(Taxonomy)
  }

  static new() {
    return new TaxonomyBuilder()
  }

  display() {
    this.public().withArticleCount()
    return this
  }

  public() {
    this.query.apply((scope) => {
      scope.hasContent()
    })
    return this
  }

  withArticleCount() {
    this.query.withCount('articles').toSQL()
    return this
  }

  withArticles() {
    this.query.preload('articles', (query) =>
      query.apply((s) => s.forDisplay()).apply((s) => s.published())
    )
    return this
  }

  order(column: keyof Taxonomy = 'name', direction: 'asc' | 'desc' | undefined = 'asc') {
    this.query.orderBy(column, direction)
    return this
  }
}
