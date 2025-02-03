import db from '@adonisjs/lucid/services/db'
import { Category } from '../domain/category.js'
import { CategoryIdentifier } from '../domain/category_identifier.js'
import TaxonomyBuilder from '../builder/categoryBuilder.js'

export class CategoryRepository {
  builder() {
    return TaxonomyBuilder.new()
  }

  async all() {
    const categoriesRecords = await db
      .from('categories')
      .select(['id', 'name'])
      .orderBy('name')
      .exec()

    return categoriesRecords.map((categoryRecord) => {
      return Category.create({
        id: CategoryIdentifier.fromString(categoryRecord.id),
        name: categoryRecord.name,
      })
    })
  }

  getList() {
    return this.builder().display().query.exec()
  }
}
