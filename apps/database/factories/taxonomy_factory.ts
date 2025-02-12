import Taxonomy from '#models/taxonomy'
import factory from '@adonisjs/lucid/factories'
import { ArticleFactory } from './article_factory.js'

export const TaxonomyFactory = factory
  .define(Taxonomy, async ({ faker }) => {
    return {
      name: faker.word.words({ count: { min: 1, max: 3 } }),
    }
  })
  .relation('articles', () => ArticleFactory)
  .relation('children', () => TaxonomyFactory)
  .build()
