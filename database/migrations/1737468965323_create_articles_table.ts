import States from '#enums/state'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('slug').unique().notNullable()
      table.string('summary')
      table.string('content')
      table.integer('state_id').unsigned().notNullable().defaultTo(States.DRAFT)
      table.string('publish_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
