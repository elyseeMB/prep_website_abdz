import Category from '#models/category'
import Taxonomy from '#models/taxonomy'
import { BaseBuilder } from '../../../builder/base_builder.js'

export default class CategoryBuilder extends BaseBuilder<typeof Category, Category> {
  constructor() {
    super(Category)
  }

  static new() {
    return new CategoryBuilder()
  }

  display() {
    this.public().withPostCount()
    return this
  }

  public() {
    this.query.apply((scope) => {
      scope.hasContent()
    })
    return this
  }

  withPostCount() {
    this.query.withCount('articles')
    return this
  }

  withPosts() {
    this.query.preload('articles', (query) => query.apply((s) => s.h()))
    return this
  }
}
