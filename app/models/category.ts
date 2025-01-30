import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import Article from './article.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Taxonomy from './taxonomy.js'
import States from '#enums/state'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Article, {
    pivotTable: 'taxonomies',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'article_id',
  })
  declare articles: ManyToMany<typeof Article>

  static hasContent = scope<
    typeof Category,
    (query: ModelQueryBuilderContract<typeof Category>) => void
  >((query) => {
    query.has('articles').preload('articles', (a) => a.apply((s) => s.published()))
  })

  // si l'utilise les has ou autre il va me renvoyer que les categories des articles | posts | others qui sont publiés
}
