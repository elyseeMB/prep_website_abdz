import Taxonomy from '#models/taxonomy'

type Params = {
  parentId: number
}

export default class GetTaxonomies {
  static async handle({ parentId }: Params) {
    return Taxonomy.query()
      .if(parentId, (query) => query.where({ parentId }))
      .if(!parentId, (query) => query.whereNull('parentId'))
      .preload('parent')
      .withCount('children')
      .withCount('articles')
      .withCount('Collections')
      .orderBy('name')
  }
}
