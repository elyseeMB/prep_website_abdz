import Article from '#models/article'
import { bento } from '#services/bento_service'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'
import CacheNamespaces from '../app/enums/cache_namespaces.js'

export default class CheckArticles extends BaseCommand {
  static commandName = 'check:articles'
  static description =
    'Check for newly published recently updated, or delayed released articles and clear cache if needed'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Starting "CheckArticles"')

    const end = DateTime.now().toSQL()
    // const endDelayed = DateTime.now().minus({ days: 14 }).toSQL()
    const start = DateTime.now().minus({ minutes: 5 }).toSQL()
    // const startDelayed = DateTime.now().minus({ days: 14, minutes: 5 }).toSQL()

    const articles = await Article.query().whereBetween('updatedAt', [start, end])

    if (!articles.length) {
      this.logger.info('No new articles found')
      return
    } else {
      this.logger.info(`Found ${articles.length} new, updated, or delayed articles`)
    }

    await bento.namespace(CacheNamespaces.ARTICLES).clear()
    await bento.namespace(CacheNamespaces.COLLECTIONS).clear()
    await bento.namespace(CacheNamespaces.TAXONOMIES).clear()

    await bento.disconnect()

    this.logger.info(
      `Cleared cache namespaces: ${CacheNamespaces.ARTICLES}, ${CacheNamespaces.COLLECTIONS}, ${CacheNamespaces.TAXONOMIES}`
    )
  }
}
