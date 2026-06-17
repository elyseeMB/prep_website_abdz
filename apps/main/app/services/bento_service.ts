import env from '#start/env'
import { BentoCache, bentostore } from 'bentocache'
import { redisDriver } from 'bentocache/drivers/redis'
import { memoryDriver } from 'bentocache/drivers/memory'

export const bento = new BentoCache({
  default: 'cache',
  ttl: '7days',
  grace: '12h',
  timeout: '300ms',
  stores: {
    cache: bentostore()
      .useL1Layer(memoryDriver({ maxSize: 10_000 }))
      .useL2Layer(
        redisDriver({
          connection: {
            host: env.get('REDIS_HOST'),
            port: env.get('REDIS_PORT'),
          },
        })
      ),
  },
})
