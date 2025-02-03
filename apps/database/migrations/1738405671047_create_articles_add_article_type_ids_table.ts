import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AlterArticlesAddArticleTypeIds extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('article_type_id').unsigned().notNullable().defaultTo(1)
      table.string('redirect_url').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('article_type_id')
      table.dropColumn('redirect_url')
    })
  }
}
