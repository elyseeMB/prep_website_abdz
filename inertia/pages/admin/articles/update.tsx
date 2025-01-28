import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Field } from '~/components/ui/Field.js'
import { client } from '~/pages/login.js'

type PropsArticleUpdate = {
  id: number
  title: string
  content: string
  summary: string
  created_at: string
  updated_at: string
  categoryId: number
  categoryName: string
}

export default function Update({
  currentUser,
  article,
  categories,
}: {
  currentUser: PropsCurrentUser
  article: { props: PropsArticleUpdate }
  categories: { id: number; name: string }[]
}) {
  const form = useForm({
    title: article.props.title,
    summary: article.props.summary,
    content: article.props.content,
    categoryId: categories[0].id,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = client.$url('admin.articles.update', {
      params: { id: article.props.id.props.value },
    })
    form.put(url)
  }

  return (
    <div className="md:container md:mx-auto p-8">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">Update Information</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">welcome {currentUser.name}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sauvegarder
            </button>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                <Field
                  onChange={(ev) => form.setData('title', ev.currentTarget.value)}
                  name="title"
                  defaultValue={form.data.title}
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Summary</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Field
                    onChange={(ev) => form.setData('summary', ev.currentTarget.value)}
                    type="text"
                    name="summary"
                    defaultValue={form.data.summary}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">content</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Field
                    onChange={(ev) => form.setData('content', ev.currentTarget.value)}
                    type="textarea"
                    name="content"
                    value={form.data.content}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Categories</dt>
                <dd className="flex gap-4 justify-between mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center rounded-md bg-${article.props.categoryId === 1 ? 'yellow' : 'blue'}-50 px-2 py-1 text-xs font-medium text-${article.props.categoryId === 1 ? 'yellow' : 'blue'}-800 ring-1 ring-${article.props.categoryId === 1 ? 'yellow' : 'blue'}-600/20 ring-inset`}
                  >
                    {article.props.categoryName}
                  </span>
                  <select
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                    id="menu-button"
                    onChange={(ev) => {
                      form.setData('categoryId', parseInt(ev.currentTarget.value, 10))
                    }}
                    name="categoryId"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </div>
    </div>
  )
}
