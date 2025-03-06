export default function View(props) {
  console.log(props)
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Blogs.</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 gap-5">
            {props.vm.map((article) => (
              <div className="group relative" key={article.id}>
                <img
                  src={article.thumbnails[0].filename}
                  alt="Collection of four insulated travel bottles on wooden shelf."
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                />
                <h3 className="mt-2 text-sm text-gray-900 font-semibold">
                  <a href="#">
                    <span className="absolute inset-0 t"></span>
                    {article.title}
                  </a>
                </h3>
                <p className="text-base text-sm text-gray-500">{article.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
