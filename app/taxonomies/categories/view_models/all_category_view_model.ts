import { Category } from '../domain/category.js'

export class AllCategoryViewModel {
  constructor(protected categories: Category[]) {}

  static fromDomain(categories: Category[]) {
    return new this(categories)
  }

  serialize() {
    return this.categories.map((category) => ({
      id: category.getIdentifier().toString(),
      name: category.props.name,
    }))
  }
}
