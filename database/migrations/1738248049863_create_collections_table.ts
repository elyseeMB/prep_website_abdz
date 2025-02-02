import CollectionTypes from '#collections/enums/collection_types'
import Status from '#collections/enums/status'
import States from '#enums/state'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('parent_id').unsigned().references('id').inTable(this.tableName)
      table.integer('collection_type_id').unsigned().notNullable().defaultTo(CollectionTypes.COURSE)
      table.integer('status_id').unsigned().notNullable().defaultTo(Status.IN_PROGRESS)
      table.integer('state_id').unsigned().notNullable().defaultTo(States.PUBLIC)
      table.string('name', 100).notNullable()
      table.string('slug', 150).notNullable()
      table.string('sort_order').notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
