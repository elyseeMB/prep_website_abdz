// import ModelArticle from '#models/article'
// import ArticleBuilder from '../builder/article_builder.js'
// import { Article } from './article.js'
// import { ArticleIdentifier } from './article_identitfier.js'

// export class ArticleTransformer {
//   constructor(private articles: ArticleBuilder) {}

//   static fromDomain(article: ArticleBuilder) {
//     return new this(article)
//   }

//   async serialize() {
//     const articles = await this.articles.query.exec()
//     return articles.map((article) => {
//       return this.toDomain(article)
//     })
//   }

//   toDomain(article: ModelArticle) {
//     return Article.create({
//       id: ArticleIdentifier.fromString(article.id.toString()),
//       title: article.title,
//       slug: article.slug,
//       summary: article.summary,
//       content: article.content,
//       authors: article.authors,
//       taxonomies: article.taxonomies,
//       thumbnails: article.thumbnails,
//     })
//   }
// }
