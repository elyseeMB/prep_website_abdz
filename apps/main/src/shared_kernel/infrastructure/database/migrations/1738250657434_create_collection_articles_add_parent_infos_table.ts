import { BaseSchema } from '@adonisjs/lucid/schema'

export default class collectionPostsAddParentInfos extends BaseSchema {
  protected tableName = 'collection_articles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('root_collection_id').unsigned().references('id').inTable('collections')
      table.integer('root_sort_order').unsigned()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('root_collection_id')
      table.dropColumn('root_sort_order')
    })
  }
}
