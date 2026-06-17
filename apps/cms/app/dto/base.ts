import { LucidRow, ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'

import is from '@adonisjs/core/helpers/is'

export type StaticDto<Model, Dto> = {
  new (model: Model): Dto
}

export interface SimplePaginatorDtoContract<Dto> {
  data: Dto[]
  meta: SimplePaginatorDtoMetaContract
}
export interface SimplePaginatorDtoMetaContract {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
  pagesInRange?: {
    url: string
    page: number
    isActive: boolean
  }[]
}
export type SimplePaginatorDtoMetaRange = {
  start: number
  end: number
}

export default class BaseVM {
  static consumable<T extends BaseVM>(model: new () => T, results: any[]) {
    return results.map((result) => {
      if (result instanceof model) {
        return model
      }

      const instance = new model()
      instance.fill(result)

      return instance
    })
  }

  fill<T extends Object>(object: T) {
    if (is.object(object)) {
      Object.keys(object).map((key) => {
        const value = (object as any)[key]
        ;(this as any)[key] = value
      })
    }
  }

  static fromArray<SourceObject, Dto extends BaseVM>(
    this: StaticDto<SourceObject, Dto>,
    sources: SourceObject[]
  ): Dto[]

  static fromPaginator<Model, Dto extends BaseVM>(
    this: StaticDto<Model, Dto>,
    paginator: Model extends LucidRow
      ? ModelPaginatorContract<Model>
      : SimplePaginatorContract<Model>,
    range?: SimplePaginatorDtoMetaRange
  ): SimplePaginatorDto<Model, Dto>
}

export class SimplePaginatorDto<Model, Dto extends BaseVM>
  implements SimplePaginatorDtoContract<Dto>
{
  data: Dto[]
  meta: SimplePaginatorDtoMetaContract
  /**
   * Constructs a new instance of the SimplePaginatorDto class.
   *
   * @param {SimplePaginatorContract<Model>|ModelPaginatorContract<Model>} paginator - The paginator object containing the data.
   * @param {StaticDto<Model, Dto>} dto - The static DTO class used to map the data.
   * @param {SimplePaginatorDtoMetaRange} [range] - Optional range for the paginator.
   */
  constructor(
    paginator: Model extends LucidRow
      ? ModelPaginatorContract<Model>
      : SimplePaginatorContract<Model>,
    dto: StaticDto<Model, Dto>,
    range?: SimplePaginatorDtoMetaRange
  )
}
