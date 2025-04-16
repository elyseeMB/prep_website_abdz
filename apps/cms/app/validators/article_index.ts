import vine from '@vinejs/vine'
import { exists } from './helpers/db.js'

export const articleIndexValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().max(100).optional(),
  })
)

export const articlesValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(100),
    slug: vine
      .string()
      .trim()
      .maxLength(255)
      .unique(async (db, value, field) => {
        const result = await db
          .from('articles')
          .select('id')
          .whereILike('slug', value)
          .if(field.meta.id, (query) => query.whereNot('id', field.meta.id))
          .first()
        return !result
      })
      .optional(),
    summary: vine.string().trim().maxLength(100).optional(),
    pageTitle: vine.string().trim().maxLength(100).optional(),
    metaDescription: vine.string().trim().maxLength(255).optional(),
    canonical: vine.string().trim().maxLength(255).optional(),
    articleTypeId: vine.number(),
    content: vine.string().trim().optional(),
    // stateId: vine.number().enum(States).optional(),
    // publishAt: vine.string(),
    thumbnails: vine.object({
      id: vine.number().exists(exists('assets', 'id')).optional(),
    }),
    taxonomyIds: vine.array(vine.number().exists(exists('taxonomies', 'id'))).optional(),
  })
)
