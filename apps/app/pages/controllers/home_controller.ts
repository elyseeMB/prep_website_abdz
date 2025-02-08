import type { HttpContext } from '@adonisjs/core/http'
import { CategoryRepository } from '../../taxonomies/categories/repositories/category_repository.js'
import { inject } from '@adonisjs/core'
import Category from '#models/category'
import { CamelCaseNamingStrategy } from '@adonisjs/lucid/orm'
import SlugService from '#articles/services/slug_service'
import Article from '#models/article'

@inject()
export default class HomeController {
  constructor(private categoryRepository: CategoryRepository) {}

  async render({ inertia }: HttpContext) {
    // const doc = this.categoryRepository.all()

    // const cat = this.builder().display()

    const doc = await this.categoryRepository.getList()
    console.log(doc)

    // const categories = doc.reduce((acc, value) => {
    //   acc[value.$attributes.name] = { article: value.articles, count: value.$extras }
    //   return acc
    // }, {})

    return inertia.render('home')
  }
}
