import edge from 'edge.js'
import env from './env.js'
import UtilityService from '#services/utility_service'

globalThis.localhost = 'http://localhost:3333'

globalThis.Eembouz = {
  appUrl: env.get('APP_URL'),
}

// EDGE template
edge.global('utils', UtilityService)
