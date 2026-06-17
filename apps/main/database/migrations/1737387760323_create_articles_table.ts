import States from '#enums/state'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('slug').unique().notNullable()
      table.string('page_title', 100).nullable()
      table.string('description', 255).nullable()
      table.string('meta_description', 255).nullable()
      table.string('canonical', 255).nullable()
      table.string('summary').nullable()
      table.text('content').nullable()
      table.integer('state_id').unsigned().notNullable().defaultTo(States.DRAFT)
      table.string('publish_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('view_count').nullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
