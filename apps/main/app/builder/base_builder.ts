import ArticleTypes from '#enums/article_types'
import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export class BaseBuilder<Model extends LucidModel, Record extends LucidRow> {
  query: ModelQueryBuilderContract<Model, Record>

  constructor(protected model: Model) {
    this.query = model.query()
  }

  if(condition: any, cb: (self: this) => this) {
    if (condition) {
      cb(this)
    }
    return this
  }

  where(column: string, operator?: any, value?: any) {
    if (value !== undefined) {
      this.query.where(column, operator, value)
      return this
    }

    this.query.where(column, operator)
    return this
  }

  select(table: string) {
    this.query.from(table)
    return this
  }

  first() {
    this.query.first()
    return this
  }

  firstOrFail() {
    this.query.firstOrFail()
    return this
  }

  limit(limit: number) {
    this.query.limit(limit)
    return this
  }

  orderBy(column: string, direction: 'desc' | 'asc' = 'asc') {
    this.query.orderBy(column, direction)
    return this
  }

  async paginate(page: number, perPage?: number | undefined, url: string | undefined = undefined) {
    const result = await this.query.paginate(page, perPage)
    if (url) {
      result.baseUrl(url)
    }
    return result
  }
}
