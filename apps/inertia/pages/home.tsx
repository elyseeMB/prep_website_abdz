import { Footer, Card } from '@website/design-system'

export default function Home({ currentUser, series }: any) {
  console.log(series.collections)
  return (
    <>
      <h1 className="text-orange"> {series.collections[0].props.name}</h1>

      <section className="w-full">
        {series.collections[0].props.articles.map((article: any, index) => (
          <Card
            index={index}
            title={article.title}
            content={article.content}
            key={article.id}
            asset={article.assets[0].filename}
          />
        ))}
      </section>

      <Footer />
    </>
  )
}
