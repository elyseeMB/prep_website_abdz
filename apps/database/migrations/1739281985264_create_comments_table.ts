import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.integer('article_id').unsigned().references('id').inTable('articles').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable()
      table.integer('reply_to').unsigned().references('id').inTable(this.tableName).nullable()
      table.integer('state_id').unsigned().nullable()
      table.text('body')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
