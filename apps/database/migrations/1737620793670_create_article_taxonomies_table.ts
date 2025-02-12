import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_taxonomies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('taxonomy_id').unsigned().references('id').inTable('taxonomies')
      // .onDelete('CASCADE')
      table.integer('article_id').unsigned().references('id').inTable('articles')
      // .onDelete('CASCADE')
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
