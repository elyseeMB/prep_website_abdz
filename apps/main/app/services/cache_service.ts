import redis from '@adonisjs/redis/services/main'

export default class CacheService {
  constructor() {
    redis.connection('main')
  }

  async handle(key: string, value: any) {
    await redis.set(key, value)
    const doc = await redis.get(key)
    return doc
  }
}
