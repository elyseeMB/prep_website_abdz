import type { HttpContext } from '@adonisjs/core/http'
import { CategoryRepository } from '../../taxonomies/categories/repositories/category_repository.js'
import { inject } from '@adonisjs/core'
import Category from '#models/category'

@inject()
export default class HomeController {
  constructor(private categoryRepository: CategoryRepository) {}

  async render({ inertia }: HttpContext) {
    // const doc = this.categoryRepository.all()

    // const a = this.builder().display()

    const articleCount = await this.categoryRepository.getList()

    console.log(articleCount.map((s) => s))

    return inertia.render('home')
  }
}
