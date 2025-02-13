import factory from '@adonisjs/lucid/factories'
import Asset from '#models/asset'
import AssetTypes from '#assets/enums/asset_types'

export const AssetFactory = factory
  .define(Asset, async ({ faker }) => {
    return {
      filename: faker.image.url(),
      assetTypeId: AssetTypes.THUMBNAIL,
      byteSize: 0,
    }
  })
  .state('thumbnail', (row, { faker }) => {
    row.assetTypeId = AssetTypes.THUMBNAIL
    row.filename = faker.image.url({ width: 1280, height: 720 })
  })
  .state('cover', (row, { faker }) => {
    row.assetTypeId = AssetTypes.COVER
    row.filename = faker.image.url({ width: 1280, height: 720 })
  })
  .build()
