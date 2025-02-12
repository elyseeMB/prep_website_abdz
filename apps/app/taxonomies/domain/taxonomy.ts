import { Entity } from '#core/domain/entity.'
import type { TaxonomyIdentifier } from './taxonomy_identifier.js'

interface Properties {
  id: TaxonomyIdentifier
  name: string
}

export class Taxonomy extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
