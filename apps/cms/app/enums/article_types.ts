enum ArticleTypes {
  LESSON = 1,
  BLOG = 2,
  LINK = 3,
  NEWS = 4,
}

export const ArticleTypesDesc: Record<ArticleTypes, string> = {
  [ArticleTypes.LESSON]: 'Lesson',
  [ArticleTypes.BLOG]: 'Blog',
  [ArticleTypes.LINK]: 'Link',
  [ArticleTypes.NEWS]: 'News',
}

export default ArticleTypes
