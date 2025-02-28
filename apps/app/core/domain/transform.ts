// // /domain/collections/transformers/collection_transformer.ts
// import Collection from '../models/collection.js'
// import { CollectionIdentifier } from '../value_objects/collection_identifier.js'
// import { CollectionData } from '../../infrastructure/repositories/collection_repository_types.js'
// import { Entity } from './entity.js'
// import { Identifier } from './identifier.js'
// import CollectionBuilder from '../../collections/builder/collection_builder.js'

// // static async transformer(builder: CollectionBuilder) {
// //     const collections = await builder.query.exec()
// //     return collections.map((collection) => {
// //       return Collection.create({
// //         id: CollectionIdentifier.fromString(collection.id.toString()),
// //         name: collection.name,
// //         slug: collection.slug,
// //         articles: collection.articles,
// //         asset: collection.asset,
// //       })
// //     })
// //   }

// // static async transformer(builder: CollectionBuilder, entity) {
// //     const collections = await builder.query.exec()
// //     return collections.map((collection) => {
// //       return entity.create({
// //         id: CollectionIdentifier.fromString(collection.id.toString()),
// //         name: collection.name,
// //         slug: collection.slug,
// //         articles: collection.articles,
// //         asset: collection.asset,
// //       })
// //     })
// //   }

// //   async render({ inertia, view }: HttpContext) {
// //     const series = this.collectionRepository.getLastUpdated(1, true)
// //     const collections = await SerieController.transformer(series, Collection)

// //     return inertia.render('series/seriesList', {
// //       series: CollectionListViewModel.fromDomain(collections),
// //     })
// //   }

// export class CollectionTransformer<
//   T extends Record<string, any> & { id: Identifier<any> },
// > extends Entity<T> {
//   // Vous pourriez également avoir une méthode fromDomain si nécessaire
//   static async fromDomain(builder: CollectionBuilder, entity: any) {
//     const collections = await builder.query.exec()
//     return collections.map((collection) => {
//       return entity.create({
//         id: CollectionIdentifier.fromString(collection.id.toString()),
//         name: collection.name,
//         slug: collection.slug,
//         articles: collection.articles,
//         asset: collection.asset,
//       })
//     })
//   }
// }
