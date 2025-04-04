import edge from 'edge.js'
import env from './env.js'
import UtilityService from '#services/utility_service'
import app from '@adonisjs/core/services/app'

globalThis.localhost = 'http://localhost:3333'

globalThis.Eembouz = {
  appUrl: env.get('APP_URL'),
}

if (env.get('NODE_ENV') === 'production') {
  env.set('ASSET_DOMAIN', 'http://eembouz.com')
} else {
  env.set('ASSET_DOMAIN', 'http://localhost:3333')
}
// EDGE template
edge.global('utils', UtilityService)
edge.global('toJSON', (data: Record<string, any>) => JSON.stringify(data))
edge.global('padStartToSTring', (index: string) =>
  index?.toString().padStart(2, '0').padStart(3, '.')
)
edge.global('assetDomain', env.get('ASSET_DOMAIN'))
