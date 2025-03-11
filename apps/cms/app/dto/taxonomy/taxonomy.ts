import { Entity } from '#core/domain/entity'
import { Identifier } from '#core/domain/identifier'

export class TaxonomyCmsIdentifier extends Identifier<'TaxonomyCmsIdentifier'> {}

type Properties = {
  id: TaxonomyCmsIdentifier
  name: string
}

export class TaxonomyCms extends Entity<Properties> {
  static create(properties: Properties) {
    return new this(properties)
  }
}
