import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tests'

  async up() {
    this.schema.dropTable(this.tableName)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
