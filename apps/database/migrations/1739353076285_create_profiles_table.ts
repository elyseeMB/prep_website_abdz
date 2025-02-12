import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('biography').nullable().defaultTo('')
      table.string('location', 255).nullable().defaultTo('')
      table.string('website', 255).nullable().defaultTo('')
      table.string('company', 255).nullable().defaultTo('')
      table.string('twitter_url', 255).nullable().defaultTo('')
      table.string('facebook_url', 255).nullable().defaultTo('')
      table.string('instagram_url', 255).nullable().defaultTo('')
      table.string('linkedin_url', 255).nullable().defaultTo('')
      table.string('youtube_url', 255).nullable().defaultTo('')
      table.string('github_url', 255).nullable().defaultTo('')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
