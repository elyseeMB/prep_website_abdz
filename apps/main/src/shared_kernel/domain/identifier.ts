import { v7 as randomUUID } from 'uuid'
import { ValueObject } from './value_object.js'

export class Identifier extends ValueObject<{ value: string }> {
  protected constructor(props: { value: string }) {
    super(props)
  }
  static generate(): Identifier {
    return new Identifier({ value: randomUUID() })
  }

  static fromToString(value: string): Identifier {
    return new Identifier({ value })
  }
}
