import edge from 'edge.js'
import env from './env.js'
import UtilityService from '#services/utility_service'

globalThis.localhost = 'http://localhost:3333'

globalThis.Eembouz = {
  appUrl: env.get('APP_URL'),
}

// EDGE template
edge.global('utils', UtilityService)
edge.global('toJSON', (data: Record<string, any>) => JSON.stringify(data))
edge.global('padStartToSTring', (index: string) =>
  index?.toString().padStart(2, '0').padStart(3, '.')
)
edge.global('assetDomain', env.get('ASSET_DOMAIN', ''))
