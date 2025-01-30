import SlugService from '#articles/services/slug_service'
import Article from '#models/article'
import Category from '#models/category'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'crypto'

export default class extends BaseSeeder {
  async run() {
    // await User.create({
    //   id: parseInt(randomUUID(), 10),
    //   fullName: 'johnDoe',
    //   email: 'johnDoe@gmail.com',
    //   password: 'je suis le password',
    //   role: 2,
    // })

    // await Category.createMany([
    //   { id: 1, name: 'Actualité' },
    //   { id: 2, name: 'Societé' },
    // ])

    const slugify = new SlugService<typeof Article>({})

    const a = await slugify.make(Article, 'title', 'je suis le titre 22')

    // const article = await Article.create({
    //   id: 1,
    //   title: 'je suis le titre 1',
    //   content: 'je suis le contenu 1',
    //   summary: 'je suis le summary 1',
    // })

    // article.related('categories').attach([1, 2])

    const article = await Article.create({
      id: 22,
      title: 'je suis le titre 22',
      content: 'je suis le contenu 2=13',
      summary: 'je suis le summary 2 13',
      slug: a,
    })

    article.related('categories').attach([2])
  }
}
