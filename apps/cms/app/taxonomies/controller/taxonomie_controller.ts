import GetTaxonomies from '#actions/taxonomies/get_taxonomies'
import { HttpContext } from '@adonisjs/core/http'
import TaxonomyDto from '../../dto/taxonomy/taxonomy.js'
import Taxonomy from '#models/taxonomy'
import StoreTaxonomy from '#actions/taxonomies/store_taxonomy'
import DestroyTaxonomy from '#actions/taxonomies/destroy_taxonomy'
import UpdateTaxonomy from '#actions/taxonomies/update_taxonomy'
import db from '@adonisjs/lucid/services/db'
import TreeItem from '#models/tree_item'

export default class TaxonomiesController {
  async index({ inertia, request }: HttpContext) {
    const data = request.only(['parentId'])
    const taxonomies = await GetTaxonomies.handle(data)

    // console.log(taxonomies.map((el) => el.$extras))
    let parent: Taxonomy | null = null

    if (data.parentId) {
      parent = await Taxonomy.findOrFail(data.parentId)
    }

    return inertia.render('taxonomies/index', {
      parent: parent ? new TaxonomyDto(parent) : null,
      taxonomies: TaxonomyDto.fromArray(taxonomies),
      treeItems: await TreeItem.all(),
    })
  }

  async create({ inertia, request }: HttpContext) {
    const { parentId } = request.only(['parentId'])
    const parent = parentId ? await Taxonomy.findOrFail(parentId) : null

    return inertia.render('taxonomies/form', {
      parent: parent ? new TaxonomyDto(parent) : null,
    })
  }

  async store({ request, response }: HttpContext) {
    const data = request.all() as any

    const taxonomy = await StoreTaxonomy.handle({
      data,
    })

    return response
      .redirect()
      .toRoute('taxonomies.index', {}, { qs: { parentId: taxonomy.parentId } })
  }

  async edit({}) {}

  async tree({ request, response, params }: HttpContext) {
    const data = request.all()
    const treeId = (await TreeItem.findOrFail(1))!.merge(data)

    // if (treeId) {
    // treeId.merge(data)
    // }
    // await TreeItem.create(data)

    return response.redirect().toRoute('taxonomies.index')
  }

  async update({ request, params, response }: HttpContext) {
    const taxonomy = await Taxonomy.findOrFail(params.id)

    const data = request.all() as any

    await UpdateTaxonomy.handle(taxonomy, data)

    return response
      .redirect()
      .toRoute('taxonomies.index', {}, { qs: { parentId: taxonomy.parentId } })
  }

  async destroy({ params, response }: HttpContext) {
    const taxonomy = await Taxonomy.findOrFail(params.id)

    await DestroyTaxonomy.handle(taxonomy)

    return response
      .redirect()
      .toRoute('taxonomies.index', {}, { qs: { parentId: taxonomy.parentId } })
  }
}
