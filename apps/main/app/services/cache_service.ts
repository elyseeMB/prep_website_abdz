import redis from '@adonisjs/redis/services/main'

export default class CacheService {
  static async has(key: string): Promise<boolean> {
    return (await redis.exists(key)) === 1
  }

  static async get(key: string): Promise<string | null> {
    return await redis.get(key)
  }

  static async set(key: string, value: any) {
    await redis.set(key, value)
  }

  static async delete(key: string) {
    await redis.del(key)
  }
}
