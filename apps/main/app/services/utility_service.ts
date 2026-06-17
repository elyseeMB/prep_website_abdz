export default class UtilityService {
  static getRandom<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)]
  }

  static classes(...args: string[] | string[][]) {
    return args
      .filter((value) => !!value)
      .reduce((list, item) => {
        if (Array.isArray(item)) {
          return [...list, ...item]
        }
        return [...list, item]
      }, [])
  }
}
