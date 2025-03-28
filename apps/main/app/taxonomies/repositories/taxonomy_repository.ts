import db from '@adonisjs/lucid/services/db'
import { Taxonomy } from '../domain/taxonomy.js'
import { TaxonomyIdentifier } from '../domain/taxonomy_identifier.js'
import TaxonomyBuilder from '../builder/taxonomy_builder.js'
import TaxonomyModel from '#models/taxonomy'
import { bento } from '#services/bento_service'
import CacheNamespaces from '../../enums/cache_namespaces.js'
import { TopicListVM } from '../../topics/view_models/topicsVM.js'

export class TaxonomyRepository {
  private CACHE_KEY = 'GET_DISPLAY_LIST'

  builder() {
    return TaxonomyBuilder.new()
  }

  get cache() {
    return bento.namespace(CacheNamespaces.TAXONOMIES)
  }

  async getCachedList() {
    const results = await this.cache.getOrSet({
      key: this.CACHE_KEY,
      factory: async () => {
        const list = await this.getList(3).query.exec()
        return list.map((taxonomy) => new TopicListVM(taxonomy))
      },
    })
    return TopicListVM.consume(results)
  }

  async getForArticleFilter() {
    const topics = await this.getCachedList()
    return topics.filter((topic) => Number(topic.meta.articleCount) || '0')
  }

  getBySlug(slug: string) {
    return this.builder().display().where('slug', slug).firstOrFail()
  }

  getChildren(taxonomy: TaxonomyModel) {
    return this.builder().where('parent_id', taxonomy.id).display().order()
  }

  getList(articleLimit: number = 0) {
    return this.builder()
      .if(articleLimit, (builder) => builder.withArticles())
      .display()
      .order()
  }

  // async all() {
  //   const TaxonomyRecords = await db
  //     .from('taxonomies')
  //     .select(['id', 'name'])
  //     .orderBy('name')
  //     .exec()

  //   return TaxonomyRecords.map((taxonomyRecord) => {
  //     return Taxonomy.create({
  //       id: TaxonomyIdentifier.fromString(taxonomyRecord.id),
  //       name: taxonomyRecord.name,
  //     })
  //   })
  // }
}
