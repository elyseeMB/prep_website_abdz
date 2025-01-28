import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export class BaseBuilder<Model extends LucidModel, Record extends LucidRow> {
  query: ModelQueryBuilderContract<Model, Record>

  constructor(protected model: Model) {
    this.query = model.query()
  }

  select(table: string) {
    this.query.from(table)
    return this
  }
}
