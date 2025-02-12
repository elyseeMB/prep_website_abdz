import db from '@adonisjs/lucid/services/db'
import { Article } from '../domain/article.js'
import { ArticleIdentifier } from '../domain/article_identitfier.js'
import ArticleModel from '#models/article'
import { DateTime } from 'luxon'
import ArticleBuilder from '../builder/article_builder.js'
import { HttpContext } from '@adonisjs/core/http'
import ArticleTypes from '#enums/article_types'
import { inject } from '@adonisjs/core'

interface StoreArticleDTO {
  title: string
  summary: string
  contentHTML: string
  slug?: string
  stateId: number
}

interface UpdateArticleDTO {
  id: string
  summary: string
  title: string
  content: string
}

@inject()
export default class ArticleRepository {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.isAuthenticated ? this.ctx.auth.user : undefined
  }

  builder() {
    return ArticleBuilder.new(this.user)
  }

  getList(ArticleTypeIds: ArticleTypes[] | ArticleTypes | null = null) {
    return this.builder()
      .if(ArticleTypeIds, (builder) => builder.whereType(ArticleTypeIds))
      .display()
  }

  getBlogs() {
    return this.getList().whereType([ArticleTypes.BLOG, ArticleTypes.NEWS])
  }

  getLatest(
    limit: number | undefined = undefined,
    articleTypeIds: ArticleTypes[] | ArticleTypes | null = null
  ) {
    return this.getList(articleTypeIds)
      .if(limit, (query) => query.limit(limit!))
      .orderPublished()
  }

  findBy(column: keyof ArticleModel, value: any) {
    return this.builder()
      .where(column, value)
      .display({ skipPublishCheck: true })
      .withComments()
      .firstOrFail()
  }

  async all() {
    const articleRecords = await db
      .from('articles')
      .join('article_taxonomies', 'articles.id', 'article_taxonomies.article_id')
      .join('taxonomies', 'article_taxonomies.taxonomy_id', 'taxonomies.id')
      .select([
        'articles.id as article_id',
        'articles.title',
        'articles.summary',
        'articles.content',
        'taxonomies.id as taxonomy_id',
        'taxonomies.name as taxonomy_name',
      ])
      .orderBy('articles.created_at', 'desc')
      .exec()
    return articleRecords.map((article) => {
      return Article.create({
        id: ArticleIdentifier.fromString(article.article_id),
        title: article.title,
        summary: article.summary,
        taxonomyName: article.taxonomy_name,
        taxonomyId: article.taxonomy_id,
      })
    })
  }

  async create(payload: StoreArticleDTO, taxonomyId?: number | string) {
    const data = await ArticleModel.create({
      title: payload.title,
      summary: payload.summary,
      content: payload.contentHTML,
      slug: payload.slug,
      stateId: payload.stateId,
    })
    data.related('taxonomies').attach([taxonomyId!])
    return
    const trx = await db.transaction()
    try {
      const [articleId] = await trx
        .table('articles')
        .insert({
          title: payload.title,
          summary: payload.summary,
          content: payload.contentHTML,
          slug: payload.slug,
          state_id: payload.stateId,
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
          updated_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        })
        .returning('id')
        .exec()
      await trx
        .table('taxonomies')
        .insert({
          article_id: articleId,
          taxonomy_id: taxonomyId,
        })
        .exec()
      await trx.commit()
    } catch (error) {
      trx.rollback()
      throw new Error(error)
    }

    // const article = await ArticleModel.create({
    //   title: payload.title,
    //   summary: payload.summary,
    //   content: payload.contentHTML,
    // })
    // if (categoryId) {
    //   article.related('categories').attach([categoryId])
    // }
  }

  async update(payload: UpdateArticleDTO, taxonomyId?: number | string) {
    const trx = await db.transaction()
    try {
      const articleId = await trx
        .from('articles')
        .where('id', '=', payload.id)
        .update({
          title: payload.title,
          summary: payload.summary,
          content: payload.content,
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
          updated_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        })
        .returning('id')
        .exec()

      await trx
        .from('taxonomies')
        .update({
          taxonomy_id: taxonomyId,
        })
        .where('article_id', '=', payload.id)
        .exec()
      await trx.commit()
    } catch (error) {
      trx.rollback()
      throw new Error(error)
    }

    // return await db.from('articles').update({ payload }).where('id', '=', payload.id)
  }

  findById(id: string) {
    return db.from('articles').where('id', id).first()
  }

  async withTaxonomy(id: number) {
    const [articleRecords] = await db
      .from('articles')
      .join('article_taxonomies', 'articles.id', 'article_taxonomies.article_id')
      .join('taxonomies', 'article_taxonomies.taxonomy_id', 'taxonomies.id')
      .where('articles.id', id)
      .select(
        'articles.id as article_id',
        'articles.title',
        'articles.summary',
        'articles.content',
        'taxonomies.id as taxonomy_id',
        'taxonomies.name as taxonomy_name'
      )
      .exec()

    return Article.create({
      id: ArticleIdentifier.fromString(articleRecords.article_id.toString()),
      title: articleRecords.title,
      content: articleRecords.content,
      summary: articleRecords.summary,
      taxonomyId: articleRecords.taxonomy_id,
      taxonomyName: articleRecords.taxonomy_name,
    })
  }
}
