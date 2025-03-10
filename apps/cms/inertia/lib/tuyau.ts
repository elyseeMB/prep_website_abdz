import { api } from '../../.adonisjs/api'
import { createTuyau } from '@tuyau/client'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})
