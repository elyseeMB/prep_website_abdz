import SlugService from '#articles/services/slug_service'
import { ArticleFactory } from '#database/factories/article_factory'
import { CategoryFactory } from '#database/factories/category_factory'
import { CollectionFactory } from '#database/factories/collection_factory'
import { UserFactory } from '#database/factories/user_factory'
import Article from '#models/article'
import Category from '#models/category'
import User from '#models/user'
import UtilityService from '#services/utility_service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { randomUUID } from 'crypto'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      id: parseInt(randomUUID(), 10),
      fullName: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: 'je suis le password',
      role: 2,
    })

    // await Category.createMany([
    //   { id: 1, name: 'Actualité' },
    //   { id: 2, name: 'Societé' },
    // ])

    // const slugify = new SlugService<typeof Article>({})

    // const a = await slugify.make(Article, 'title', 'je suis le titre 22')

    // const article = await Article.create({
    //   id: 1,
    //   title: 'je suis le titre 1',
    //   content: 'je suis le contenu 1',
    //   summary: 'je suis le summary 1',
    // })

    // article.related('categories').attach([1, 2])

    // const article = await Article.create({
    //   id: 22,
    //   title: 'je suis le titre 22',
    //   content: 'je suis le contenu 2=13',
    //   summary: 'je suis le summary 2 13',
    //   // slug: a,
    // })

    // article.related('categories').attach([2])

    await this.makeFactory()
  }

  async makeFactory() {
    const trx = await db.transaction()
    try {
      await this.factoryArticle(trx)
      await this.collection(trx)
      await this.user(trx)
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.log(error)
    }
  }

  async factoryArticle(trx: TransactionClientContract) {
    const baseArticle = ArticleFactory.client(trx).with('categories')
    await baseArticle.apply('News').createMany(5)
    await baseArticle.apply('Blog').createMany(5)
    await baseArticle.apply('draft').createMany(5)
  }

  async collection(trx: TransactionClientContract) {
    let rootSortOrder = 0
    let moduleOrder = 0
    await CollectionFactory.client(trx)
      .with('children', 2, (f) =>
        f
          .tap((row) => (row.sortOrder = moduleOrder++))
          .with('articles', 5, (article) =>
            article.pivotAttributes(
              [...new Array(5)].map((_, i) => ({
                root_collection_id: f.parent.parentId,
                sort_order: i,
                root_sort_order: rootSortOrder++,
              }))
            )
          )
      )
      .create()
  }

  async user(trx: TransactionClientContract) {
    const baseUser = UserFactory.client(trx)
    await baseUser.apply('admin').createMany(2)
    await baseUser.createMany(4)
  }
}
