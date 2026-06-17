import customersRepository from '#customers/repository/customers_repository'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ListCustomersController {
  constructor(private readonly repository: customersRepository) {}

  async render({ inertia }: HttpContext) {
    const customers = await this.repository.getList()

    return inertia.render('admin/customers/viewCustomers', { customers })
  }
}
