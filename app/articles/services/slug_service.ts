import Article from '#models/article'
import { Exception } from '@adonisjs/core/exceptions'
import string from '@adonisjs/core/helpers/string'
import { LucidModel } from '@adonisjs/lucid/types/model'

export type SlugifyConfig = {
  startegy: keyof StratigiesList | SlugifyStrategyContract
  fields: string[]
  separator?: string
  maxLength?: number
  completeWords?: boolean
}

export interface SlugifyStrategyContract {
  makeSlug(model: LucidModel, field: string, value: string): string

  makeSlugUnique(
    model: LucidModel,
    field: string,
    value: string
  ): Promise<string> | TemplateStringsArray
}

export interface StratigiesList {
  simple: SlugifyStrategyContract
  dbIncrement: SlugifyStrategyContract
  shortId: SlugifyStrategyContract
}

class SimpleStrategy {
  protected maxLengthBuffer = 0
  declare separator
  constructor(private config: SlugifyConfig) {
    this.separator = config.separator || '-'
  }

  makeSlug(_: LucidModel, __: string, value: string) {
    let baseSlug = string.slug(value, {
      replacement: this.separator,
      lower: true,
      strict: true,
    })

    if (this.config.maxLength) {
      baseSlug = string.truncate(baseSlug, this.config.maxLength - this.maxLengthBuffer, {
        completeWords: this.config.completeWords,
        suffix: '',
      })
    }
    return baseSlug
  }

  async makeSlugUnique(_: LucidModel, __: string, slug: string) {
    return slug
  }
}

export default class SlugService<Model extends LucidModel> extends SimpleStrategy {
  constructor(config: SlugifyConfig) {
    super(config)
  }

  private makeSlugFromMultipleRows(
    slug: string,
    field: Extract<keyof InstanceType<Model>, string>,
    rows: InstanceType<Model>[]
  ) {
    if (!rows.length) {
      return slug
    }

    const slugs = rows.reduce<number[]>((result, row) => {
      const value = row[field] as string

      const tokens = value.toLowerCase().split(`${slug}${this.separator}`)
      if (tokens.length === 2) {
        const counter = Number(tokens[1])
        if (!Number.isNaN(counter)) {
          result = result.concat(counter)
        }
      }
      return result
    }, [])

    if (!slug.length) {
      return `${slug}${this.separator}1`
    }

    return `${slug}${this.separator}${Math.max(...slugs) + 1}`
  }

  private async getSlugForSqlite(
    model: Model,
    field: Extract<keyof InstanceType<Model>, string>,
    columnName: string,
    slug: string
  ) {
    const rows = await model
      .query()
      .select(field)
      .whereRaw('LOWER(??) = ?', [columnName, slug])
      .orWhereRaw("LOWER(??) LIKE LOWER(REPLACE(?, '-', ' '))", [columnName, slug])

    return this.makeSlugFromMultipleRows(slug, field, rows)
  }

  make(model: Model, field: Extract<keyof InstanceType<Model>, string>, slug: string) {
    model.boot()

    const column = model.$columnsDefinitions.get(field)!
    const columnName = column.columnName
    const dialect = model.$adapter.modelConstructorClient(model).dialect
    const dialectName = dialect.name

    slug = this.makeSlug(model, field, slug)

    switch (dialectName) {
      case 'better-sqlite3':
        return this.getSlugForSqlite(model, field, columnName, slug)
      default:
        throw new Exception(
          `"${dialectName}" databas is not support for the dbIncrement strategy, `,
          {
            code: 'E_UNSUPPORTED_DBINCREMENT_DIALECT',
            status: 500,
          }
        )
    }
  }
}
