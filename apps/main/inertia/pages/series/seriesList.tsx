import { ArticleProperties } from '#collections/domain/collection'
import type { CollectionListViewModeilSerialized } from '#collections/view_models/collection_list_view_model'
import { Card } from '@website/design-system'

export default function SeriesList({
  currentUser,
  series,
}: {
  currentUser?: any
  series: CollectionListViewModeilSerialized
}) {
  return (
    <div>
      <h1 className="text-orange:100">SeriesList</h1>

      <section className="w-full">
        {series.collections[0].props.articles.map((article: ArticleProperties, index: number) => (
          <Card
            index={index}
            title={article.title}
            content={article.content}
            key={article.id}
            asset={article.assets[0].filename}
          />
        ))}
      </section>
    </div>
  )
}
