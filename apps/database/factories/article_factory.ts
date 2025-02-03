import factory from '@adonisjs/lucid/factories'
import Article from '#models/article'
import Category from '#models/category'
import stringHelpers from '@adonisjs/core/helpers/string'
import States from '#enums/state'
import { CategoryFactory } from './category_factory.js'
import UtilityService from '#services/utility_service'
import ArticleTypes from '#enums/article_types'

export const ArticleFactory = factory
  .define(Article, async ({ faker }) => {
    return {
      title: stringHelpers.titleCase(
        faker.lorem.words({
          min: 3,
          max: 9,
        })
      ),
      summary: stringHelpers.titleCase(
        faker.lorem.words({
          min: 3,
          max: 9,
        })
      ),
      content: faker.lorem.paragraph(5),
      stateId: States.PUBLIC,
    }
  })
  .state('Blog', (article) => (article.articleTypeId = ArticleTypes.BLOG))
  .state('News', (article) => (article.articleTypeId = ArticleTypes.NEWS))
  .state('draft', (article) => (article.stateId = States.DRAFT))
  .relation('categories', () => CategoryFactory)
  .build()
