import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'taxonomies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('parent_id').unsigned().references('id').inTable(this.tableName).nullable()
      table.integer('asset_id').unsigned().references('id').inTable('assets').nullable()
      table.string('name', 50).notNullable()
      table.string('slug', 100).notNullable()
      table.string('description', 250).notNullable().defaultTo('')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
