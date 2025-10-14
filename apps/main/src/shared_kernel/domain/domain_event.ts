import { Identifier } from './identifier.js'

export abstract class DomainEvent {
  protected constructor(
    readonly aggregateId: Identifier,
    readonly occurredAt: Date
  ) {}
}
