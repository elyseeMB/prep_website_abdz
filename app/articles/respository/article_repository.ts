import db from '@adonisjs/lucid/services/db'
import { Article } from '../domain/article.js'
import { ArticleIdentifier } from '../domain/article_identitfier.js'
import Category from '#models/category'
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
    return this.getList().whereType([ArticleTypes.BLOG, ArticleTypes.NEWS]).exec()
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
      .firstOrFail()
      .exec()
  }

  async all() {
    const articleRecords = await db
      .from('articles')
      .join('taxonomies', 'articles.id', 'taxonomies.article_id')
      .join('categories', 'taxonomies.category_id', 'categories.id')
      .select([
        'articles.id as article_id',
        'articles.title',
        'articles.summary',
        'articles.content',
        'categories.id as category_id',
        'categories.name as category_name',
      ])
      .orderBy('articles.created_at', 'desc')
      .exec()
    return articleRecords.map((article) => {
      return Article.create({
        id: ArticleIdentifier.fromString(article.article_id),
        title: article.title,
        summary: article.summary,
        categoryName: article.category_name,
        categoryId: article.category_id,
      })
    })
  }

  async create(payload: StoreArticleDTO, categoryId?: number | string) {
    const data = await ArticleModel.create({
      title: payload.title,
      summary: payload.summary,
      content: payload.contentHTML,
      slug: payload.slug,
      stateId: payload.stateId,
    })
    data.related('categories').attach([categoryId!])
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
          category_id: categoryId,
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

  async update(payload: UpdateArticleDTO, categoryId?: number | string) {
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
          category_id: categoryId,
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

  async withCategory(id: number) {
    const [articleRecords] = await db
      .from('articles')
      .join('taxonomies', 'articles.id', 'taxonomies.article_id')
      .join('categories', 'taxonomies.category_id', 'categories.id')
      .where('articles.id', id)
      .select(
        'articles.id as article_id',
        'articles.title',
        'articles.summary',
        'articles.content',
        'categories.id as category_id',
        'categories.name as category_name'
      )
      .exec()

    return Article.create({
      id: ArticleIdentifier.fromString(articleRecords.article_id.toString()),
      title: articleRecords.title,
      content: articleRecords.content,
      summary: articleRecords.summary,
      categoryId: articleRecords.category_id,
      categoryName: articleRecords.category_name,
    })
  }
}
