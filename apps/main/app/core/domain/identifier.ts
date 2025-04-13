import { randomUUID } from 'crypto'
import { ValueObject } from './value_object.js'
import is from '@adonisjs/core/helpers/is'

export class Identifier<T extends string> extends ValueObject<{ value: string }> {
  declare meta: Record<string, any>
  // @ts-expect-error - This is a hack to make the type work
  readonly #_type: T

  static generate<T extends Identifier<any>>(this: new (props: { value: string }) => T): T {
    return new this({ value: randomUUID() })
  }

  static fromString<T extends Identifier<any>>(
    this: new (props: { value: string }) => T,
    value: string
  ): T {
    return new this({ value })
  }

  toString() {
    return this.props.value
  }

  static consumable<T extends Identifier<any>>(model: new () => T, results: any[]) {
    return results.map((result) => {
      if (result instanceof model) {
        return result
      }

      const instance = new model()

      instance.fill(result)

      return instance
    })
  }

  fill<T extends object>(object: T) {
    if (is.object(object)) {
      Object.keys(object).map((key) => {
        const value = (object as any)[key]
        ;(this as any)[key] = value
      })
    }
  }
}
