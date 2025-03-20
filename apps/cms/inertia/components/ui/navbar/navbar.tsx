import { useToggle } from '~/hooks/useToogle.js'
import { DropdownItems, Dropdowns } from '../dropdowns/dropdowns.js'
import { tuyau } from '~/lib/tuyau.js'

export function Navbar() {
  const collection = tuyau.$url('collections.index')
  const articles = tuyau.$url('articles.index')
  const articlesCreate = tuyau.$url('articles.create')
  const taxonomies = tuyau.$url('taxonomies.index')

  return (
    <nav className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                className="size-8"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Dropdowns
                  name="Post"
                  items={[
                    {
                      name: 'All post',
                      url: articles,
                    },
                    {
                      name: 'Blogs',
                      url: 'Blog',
                    },
                    {
                      name: 'create new article +',
                      url: articlesCreate,
                    },
                  ]}
                />
                <Dropdowns
                  onSubmit={() => {}}
                  name="Collection"
                  items={[
                    {
                      name: 'All post',
                      url: collection,
                    },
                    {
                      name: 'Blogs',
                      url: 'Blog',
                    },
                  ]}
                />
                <Dropdowns
                  onSubmit={() => {}}
                  name="Taxonomy"
                  items={[
                    {
                      name: 'All post',
                      url: taxonomies,
                    },
                    {
                      name: 'create',
                      url: 'Blog',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div>
                  <Dropdowns
                    name="Open user menu"
                    items={[
                      {
                        name: 'f',
                        url: '/',
                      },
                      {
                        name: 'd',
                        url: '/',
                      },
                      {
                        name: 'c',
                        url: '/',
                      },
                    ]}
                  ></Dropdowns>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
