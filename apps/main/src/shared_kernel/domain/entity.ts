import { Identifier } from './identifier.js'

export abstract class Entity<TProperties extends { id: Identifier }> {
  readonly props: TProperties

  protected constructor(props: TProperties) {
    this.props = props
  }

  getIdentifier(): Identifier {
    return this.props.id
  }

  equals(obj: Entity<TProperties>): boolean {
    if (this === obj) {
      return true
    }
    return this.getIdentifier().equals(obj.getIdentifier()) || false
  }
}
