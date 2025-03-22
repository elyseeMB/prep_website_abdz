import { api } from '../../.adonisjs/api'
import { createTuyau } from '@tuyau/client'
import { APP_DOMAIN } from './globals.ts'

export const tuyau = createTuyau({
  api,
  baseUrl: APP_DOMAIN,
})
