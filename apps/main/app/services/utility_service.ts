export default class UtilityService {
  static getRandom<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
  }
}
