import type { Identifier } from '../domain/identifier.ts'
export abstract class Entity<TProperties extends { id: Identifier<any> }> {
  readonly props: TProperties

  constructor(props: TProperties) {
    this.props = props
  }

  getIdentifier() {
    return this.props.id
  }
}
