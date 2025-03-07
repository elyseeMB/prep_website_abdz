import env from './env.js'

globalThis.localhost = 'http://localhost:3333'

globalThis.Eembouz = {
  appUrl: env.get('APP_URL'),
}
