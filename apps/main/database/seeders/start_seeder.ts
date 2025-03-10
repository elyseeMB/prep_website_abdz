import SlugService from '#articles/services/slug_service'
import { UserRole } from '#auth/enums/user_role'
import { ArticleFactory } from '#database/factories/article_factory'
import { TaxonomyFactory } from '#database/factories/taxonomy_factory'
import { CollectionFactory } from '#database/factories/collection_factory'
import { UserFactory } from '#database/factories/user_factory'
import Role from '#models/role'
import User from '#models/user'
import UtilityService from '#services/utility_service'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class extends BaseSeeder {
  getRandom<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
  }
  async run() {
    // await User.create({
    //   fullName: 'johnDoe',
    //   email: 'johnDoe@gmail.com',
    //   password: 'je suis le password',
    //   roleId: 2,
    // })
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
      await this.seedRoles(trx)
      await this.seedUsersAndContent(trx)
      // return
      // await this.seedRoles(trx)
      // await this.seedUserAndContent(trx)
      // // await this.factoryArticle(trx)
      // // await this.collection(trx)
      // // await this.user(trx)

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.log(error)
    }
  }

  // async factoryArticle(trx: TransactionClientContract) {
  //   const baseArticle = ArticleFactory.client(trx).with('taxonomies')
  //   await baseArticle.apply('News').createMany(5)
  //   await baseArticle.apply('Blog').createMany(5)
  //   await baseArticle.apply('draft').createMany(5)
  // }

  // async collection(trx: TransactionClientContract) {
  //   let rootSortOrder = 0
  //   let moduleOrder = 0
  //   await CollectionFactory.client(trx)
  //     .with('children', 2, (f) =>
  //       f
  //         .tap((row) => (row.sortOrder = moduleOrder++))
  //         .with('articles', 5, (article) =>
  //           article
  //             .pivotAttributes(
  //               [...new Array(5)].map((_, i) => ({
  //                 root_collection_id: f.parent.parentId,
  //                 sort_order: i,
  //                 root_sort_order: rootSortOrder++,
  //               }))
  //             )
  //             .with('comments', 10, (comment) => comment.tap((row) => (row.articleId = 10)))
  //             .factory.after('create', (_, row) => row.related('authors').sync([55479]))
  //         )
  //     )

  //     .create()
  // }

  // async user(trx: TransactionClientContract) {
  //   const baseUser = UserFactory.client(trx)
  //   const admin = await baseUser.apply('admin').create()
  //   await this.seedTaxonomies(trx, admin)

  //   const freeUser = await baseUser.apply('User').createMany(10)
  //   // const userIds = [...freeUser.map((user) => user.id), ...admin.map((userAdmin) => userAdmin.id)]
  //   // return userIds
  // }

  // seedRoles(trx: TransactionClientContract) {
  //   return Role.createMany(
  //     [
  //       {
  //         id: UserRole.User,
  //         name: 'User',
  //         description: 'Authenticated User',
  //       },
  //       {
  //         id: UserRole.Admin,
  //         name: 'Admin',
  //         description: 'Super User',
  //       },
  //     ],
  //     { client: trx }
  //   )
  // }

  // async seedTaxonomies(trx: TransactionClientContract, admin: User) {
  //   const ownerId = admin.id
  //   const rootTaxonomyNames = ['AdonisJS', 'AWS Amplify', 'Nuxt', 'JavaScript', 'VueJS', 'HTMX']
  //   const adonisChildrenNames = [
  //     'Bouncer',
  //     'Router',
  //     'HttpContext',
  //     'Ace CLI',
  //     'Validator',
  //     'Lucid',
  //     'Tips',
  //     'Edge',
  //     'Authorization',
  //   ]
  //   const taxBase = TaxonomyFactory.client(trx)
  //   const [adonis, ...other] = await Promise.all(
  //     rootTaxonomyNames.map((name) => taxBase.merge({ name, ownerId }).create())
  //   )
  //   const adonisChilren = await Promise.all(
  //     adonisChildrenNames.map((name) =>
  //       taxBase.merge({ name, parentId: adonis.id, rootParentId: adonis.id, ownerId }).create()
  //     )
  //   )
  //   return [adonis.id, ...other.map((t) => t.id), ...adonisChilren.map((t) => t.id)]
  // }

  // async seedUserAndContent(trx: TransactionClientContract) {
  //   const password = 'password'
  //   const baseUser = UserFactory.client(trx).with('profile').merge({ password })
  //   const admin = await baseUser.apply('admin').create()
  //   const OrdinaryUser = await baseUser.apply('User').createMany(10)
  //   const userIds = [...OrdinaryUser.map((u) => u.id)]
  //   const taxonomyIds = await this.seedTaxonomies(trx, admin)

  //   let rootSortOrder = 0
  //   let moduleSortOrder = 0
  //   await CollectionFactory.client(trx)
  //     .merge({ ownerId: admin.id, name: "Let's Learn Adonisjs" })
  //     .with('asset', 1, (f) => f.apply('icon'))
  //     .with('children', 5, (f) =>
  //       f
  //         .merge({ ownerId: admin.id })
  //         .tap((row) => (row.sortOrder = moduleSortOrder++))
  //         .with('articles', 5, (articles) =>
  //           articles
  //             .pivotAttributes(
  //               [...new Array(5)].map((_, i) => ({
  //                 root_collection_id: f.parent.parentId,
  //                 sort_order: i,
  //                 root_sort_order: rootSortOrder++,
  //               }))
  //             )
  //             .with('assets', 1, (asset) =>
  //               asset.apply('thumbnail').pivotAttributes({ sort_order: 0 })
  //             )
  //             .with('comments', 6, (comments) =>
  //               comments.tap((row) => (row.userId = this.getRandom(userIds)))
  //             )
  //             .factory.after('create', async (_, row) => {
  //               await row.related('authors').sync([admin.id])
  //               await row.related('taxonomies').sync([this.getRandom(taxonomyIds)])
  //             })
  //         )
  //     )

  //     .create()

  //   rootSortOrder = 0
  //   moduleSortOrder = 0
  //   await CollectionFactory.client(trx)
  //     .merge({ ownerId: admin.id })
  //     .with('asset', 1, (f) => f.apply('icon'))
  //     .with('articles', 10, (f) =>
  //       f
  //         .pivotAttributes(
  //           [...new Array(10)].map((_, i) => ({
  //             root_collection_id: f.parent.id,
  //             sort_order: i,
  //             root_sort_order: rootSortOrder++,
  //           }))
  //         )
  //         .with('assets', 1, (asset) => asset.apply('thumbnail').pivotAttributes({ sort_order: 0 }))
  //         .with('comments', 6, (comments) =>
  //           comments.tap((row) => (row.userId = this.getRandom(userIds)))
  //         )
  //         .factory.after('create', async (_, row) => {
  //           await row.related('authors').sync([admin.id])
  //           await row.related('taxonomies').sync([this.getRandom(taxonomyIds)])
  //         })
  //     )
  //     .createMany(3)
  // }

  async seedRoles(trx: TransactionClientContract) {
    return Role.createMany(
      [
        {
          id: UserRole.User,
          name: 'User',
          description: 'Authenticated User',
        },
        {
          id: UserRole.Admin,
          name: 'Admin',
          description: 'Super User',
        },
        {
          id: UserRole.CONTRIBUTOR_LVL_1,
          name: 'Contributor LVL 1',
          description: 'Can contribute content',
        },
        {
          id: UserRole.CONTRIBUTOR_LVL_2,
          name: 'Contributor LVL 2',
          description: 'Can contribute content, series, and taxonomies',
        },
      ],
      {
        client: trx,
      }
    )
  }

  async seedTaxonomies(trx: TransactionClientContract, admin: User) {
    const ownerId = admin.id
    const rootTaxonomyNames = ['AdonisJS', 'AWS Amplify', 'Nuxt', 'JavaScript', 'VueJS', 'HTMX']
    const adonisChildrenNames = [
      'Bouncer',
      'Router',
      'HttpContext',
      'Ace CLI',
      'Validator',
      'Lucid',
      'Tips',
      'Edge',
      'Authorization',
    ]
    const taxBase = TaxonomyFactory.client(trx).with('asset', 1, (f) => f.apply('icon'))
    const [adonis, ...others] = await Promise.all(
      rootTaxonomyNames.map((name) => taxBase.merge({ name, ownerId }).create())
    )
    const adonisChildren = await Promise.all(
      adonisChildrenNames.map((name) =>
        taxBase.merge({ name, parentId: adonis.id, rootParentId: adonis.id, ownerId }).create()
      )
    )

    return [adonis.id, ...others.map((t) => t.id), ...adonisChildren.map((t) => t.id)]
  }

  async seedUsersAndContent(trx: TransactionClientContract) {
    const password = 'Password!01' // we'll set our own password so we can login as user
    const baseUser = UserFactory.client(trx).with('profile').merge({ password })
    const admin = await baseUser.apply('admin').create()
    const contributorLvl1 = await baseUser.apply('contributorLvl1').create()
    const contributorLvl2 = await baseUser.apply('contributorLvl2').create()
    const freeUsers = await baseUser.createMany(50)
    const userIds = [...freeUsers.map((u) => u.id)]
    const taxonomyIds = await this.seedTaxonomies(trx, admin)

    // creates the following all tied to admin
    //    mock "Lets Learn" series
    //    with 5 sub-collections
    //    containing 5 lessons each
    //    which are tied to random taxonomies
    //    each lesson also gets 6 comments from random users
    let rootSortOrder = 0
    let moduleSortOrder = 0
    await CollectionFactory.client(trx)
      .merge({ ownerId: admin.id, name: "Let's Learn AdonisJS 5" })
      .with('asset', 1, (f) => f.apply('icon'))
      .with('children', 5, (f) =>
        f
          .merge({ ownerId: admin.id })
          .tap((row) => (row.sortOrder = moduleSortOrder++))
          .with('articles', 5, (posts) =>
            posts
              .pivotAttributes(
                [...new Array(5)].map((_, i) => ({
                  root_collection_id: f.parent.parentId,
                  sort_order: i,
                  root_sort_order: rootSortOrder++,
                }))
              )
              .with('assets', 1, (assets) =>
                assets.apply('thumbnail').pivotAttributes({ sort_order: 0 })
              )
              .with('comments', 6, (comments) =>
                comments.tap((row) => (row.userId = UtilityService.getRandom(userIds)))
              )
              .factory.after('create', async (_, row) => {
                await row.related('authors').sync([admin.id])
                await row.related('taxonomies').sync([UtilityService.getRandom(taxonomyIds)])
              })
          )
      )
      .create()

    // creates the following all tied to admin
    //    5 mock series
    //    with 4 sub-collections
    //    containing 5 lessons each
    //    which are tied to random taxonomies
    //    each lesson also gets 6 comments from random users
    rootSortOrder = 0
    moduleSortOrder = 0
    await CollectionFactory.client(trx)
      .merge({ ownerId: admin.id })
      .with('asset', 1, (f) => f.apply('icon'))
      .with('children', 4, (f) =>
        f
          .merge({ ownerId: admin.id })
          .tap((row) => (row.sortOrder = moduleSortOrder++))
          .with('articles', 5, (posts) =>
            posts
              .pivotAttributes(
                [...new Array(5)].map((_, i) => ({
                  root_collection_id: f.parent.parentId,
                  sort_order: i,
                  root_sort_order: rootSortOrder++,
                }))
              )
              .with('assets', 1, (assets) =>
                assets.apply('thumbnail').pivotAttributes({ sort_order: 0 })
              )
              .with('comments', 6, (comments) =>
                comments.tap((row) => (row.userId = UtilityService.getRandom(userIds)))
              )
              .factory.after('create', async (_, row) => {
                await row.related('authors').sync([admin.id])
                await row.related('taxonomies').sync([UtilityService.getRandom(taxonomyIds)])
              })
          )
      )
      .createMany(5)

    // creates the following all tied to contributorLvl2
    //    3 mock series
    //    with 4 sub-collections
    //    containing 5 lessons each
    //    which are tied to random taxonomies
    //    each lesson also gets 6 comments from random users
    rootSortOrder = 0
    moduleSortOrder = 0
    await CollectionFactory.client(trx)
      .merge({ ownerId: contributorLvl2.id })
      .with('asset', 1, (f) => f.apply('icon'))
      .with('children', 4, (f) =>
        f
          .merge({ ownerId: contributorLvl2.id })
          .tap((row) => (row.sortOrder = moduleSortOrder++))
          .with('articles', 5, (posts) =>
            posts
              .pivotAttributes(
                [...new Array(5)].map((_, i) => ({
                  root_collection_id: f.parent.parentId,
                  sort_order: i,
                  root_sort_order: rootSortOrder++,
                }))
              )
              .with('assets', 1, (assets) =>
                assets.apply('thumbnail').pivotAttributes({ sort_order: 0 })
              )
              .with('comments', 6, (comments) =>
                comments.tap((row) => (row.userId = UtilityService.getRandom(userIds)))
              )
              .factory.after('create', async (_, row) => {
                await row.related('authors').sync([contributorLvl2.id])
                await row.related('taxonomies').sync([UtilityService.getRandom(taxonomyIds)])
              })
          )
      )
      .createMany(3)

    // creates the following
    //    3 mock series tied to admin (contributorLvl1 doesn't have access to create collections/taxonomies)
    //    containing 10 lessons each, authored by contributorLvl2
    //    which are tied to random taxonomies
    //    each lesson also gets 6 comments from random users
    rootSortOrder = 0
    await CollectionFactory.client(trx)
      .merge({ ownerId: admin.id })
      .with('asset', 1, (f) => f.apply('icon'))
      .with('articles', 10, (f) =>
        f
          .pivotAttributes(
            [...new Array(10)].map((_, i) => ({
              root_collection_id: f.parent.id,
              sort_order: i,
              root_sort_order: rootSortOrder++,
            }))
          )
          .with('assets', 1, (assets) =>
            assets.apply('thumbnail').pivotAttributes({ sort_order: 0 })
          )
          .with('comments', 6, (comments) =>
            comments.tap((row) => (row.userId = UtilityService.getRandom(userIds)))
          )
          .factory.after('create', async (_, row) => {
            await row.related('authors').sync([contributorLvl1.id])
            await row.related('taxonomies').sync([UtilityService.getRandom(taxonomyIds)])
          })
      )
      .createMany(3)

    // creates the following
    //    3 mock series tied to admin (contributorLvl1 doesn't have access to create collections/taxonomies)
    //    containing 10 lessons each, authored by contributorLvl2
    //    which are tied to random taxonomies
    //    each lesson also gets 6 comments from random users
    rootSortOrder = 0
    await CollectionFactory.client(trx)
      .merge({ ownerId: admin.id })
      .with('asset', 1, (f) => f.apply('icon'))
      .with('articles', 10, (f) =>
        f
          .apply('Blog')
          .pivotAttributes(
            [...new Array(10)].map((_, i) => ({
              root_collection_id: f.parent.id,
              sort_order: i,
              root_sort_order: rootSortOrder++,
            }))
          )
          .with('assets', 1, (assets) =>
            assets.apply('thumbnail').pivotAttributes({ sort_order: 0 })
          )
          .with('comments', 6, (comments) =>
            comments.tap((row) => (row.userId = UtilityService.getRandom(userIds)))
          )
          .factory.after('create', async (_, row) => {
            await row.related('authors').sync([contributorLvl1.id])
            await row.related('taxonomies').sync([UtilityService.getRandom(taxonomyIds)])
          })
      )
      .createMany(3)
  }
}
