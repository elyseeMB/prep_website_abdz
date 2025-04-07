import { Button } from '@website/design-system'
import {
  TableWrapper,
  TbodyWrapper,
  TdWrapper,
  ThWrapper,
  TheadWrapper,
  TrWrapper,
} from '@website/design-system/src/organisms/table/table.js'
import { tuyau } from '~/lib/tuyau.js'
import TaxonomyDto from '../../../app/dto/taxonomy/taxonomy.js'
import { router } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

type Params = {
  parent?: TaxonomyDto | null
  taxonomies?: TaxonomyDto[]
  taxonomyTypeId?: number
  breadcrumbs?: Array<{ id: number; name: string }> // Breadcrumbs should be passed from the server
}

export default function Index(props: Params) {
  const { parent, taxonomies = [], taxonomyTypeId, breadcrumbs = [] } = props

  const onDelete = (taxonomy: TaxonomyDto) => {
    if (
      confirm(
        `Are you sure you'd like to delete the taxonomy "${taxonomy.name}"? Once deleted, it'll be gone forever.`
      )
    ) {
      router.delete(tuyau.$url('taxonomies.destroy', { params: [taxonomy.id] }))
    }
  }

  // Helper to determine if a taxonomy has children
  const hasChildren = (taxonomy: TaxonomyDto) => {
    return taxonomy.meta?.children_count && Number(taxonomy.meta.children_count) > 0
  }

  const viewChildren = (taxonomy: TaxonomyDto) => {
    router.get(
      tuyau.$url('taxonomies.index', {
        query: {
          parentId: taxonomy.id,
          taxonomyTypeId,
          breadcrumbsData: JSON.stringify([
            ...breadcrumbs,
            { id: taxonomy.id, name: taxonomy.name },
          ]),
        },
      })
    )
  }

  // Navigate to a specific breadcrumb level
  const navigateToBreadcrumb = (index: number) => {
    if (index < 0) {
      // Navigate to root
      router.get(tuyau.$url('taxonomies.index'))
      return
    }

    // Get the breadcrumb at this index
    const crumb = breadcrumbs[index]

    // Navigate to that level with the breadcrumb trail up to this point
    router.get(
      tuyau.$url('taxonomies.index', {
        query: {
          parentId: crumb.id,
          taxonomyTypeId,
          breadcrumbsData: JSON.stringify(breadcrumbs.slice(0, index + 1)),
        },
      })
    )
  }

  return (
    <div className="taxonomy-index">
      {/* Header with breadcrumbs */}
      <div className="flex justify-between items-center gap-5 mb-5">
        <div className="breadcrumbs">
          <ul className="flex items-center flex-wrap gap-2">
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  router.get(tuyau.$url('dashboard'))
                }}
                className="hover:underline"
              >
                Dashboard
              </Link>
            </li>
            <li className="mx-1">/</li>
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  router.get(tuyau.$url('taxonomies.index'))
                }}
                className="hover:underline"
              >
                Taxonomies
              </Link>
            </li>

            {/* Display taxonomy type if provided */}
            {taxonomyTypeId && (
              <>
                <li className="mx-1">/</li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      router.get(
                        tuyau.$url('taxonomies.index', {
                          query: { taxonomyTypeId },
                        })
                      )
                    }}
                    className="hover:underline"
                  >
                    {taxonomyTypeId}
                  </Link>
                </li>
              </>
            )}

            {/* Render breadcrumb trail */}
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.id} className="flex items-center">
                <li className="mx-1">/</li>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToBreadcrumb(index)
                  }}
                  className="hover:underline"
                >
                  {crumb.name}
                </Link>
              </li>
            ))}

            {/* Current parent if not in breadcrumbs */}
            {parent && !breadcrumbs.some((b) => b.id === parent.id) && (
              <>
                <li className="mx-1">/</li>
                <li>{parent.name}</li>
              </>
            )}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={tuyau.$url('taxonomies.create', {
              query: parent ? { parentId: parent.id } : {},
            })}
          >
            <Button>{parent ? 'Add New Child' : 'New Taxonomy'}</Button>
          </Link>
        </div>
      </div>

      {/* Table display */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow">
        <TableWrapper>
          <TheadWrapper>
            <TrWrapper>
              <ThWrapper>Name</ThWrapper>
              {parent && <ThWrapper>Parent</ThWrapper>}
              <ThWrapper>Type</ThWrapper>
              <ThWrapper>Content</ThWrapper>
              <ThWrapper>Actions</ThWrapper>
            </TrWrapper>
          </TheadWrapper>
          <TbodyWrapper>
            {taxonomies.map((taxonomy) => (
              <TrWrapper key={taxonomy.id}>
                <TdWrapper>
                  <Link
                    href={tuyau.$url('taxonomies.edit', { params: [taxonomy.id] })}
                    className="hover:underline"
                  >
                    {taxonomy.name}
                  </Link>
                  <div className="text-slate-600 text-xs">
                    <Link href={``} className="hover:underline">
                      {taxonomy.slug}
                    </Link>
                  </div>
                </TdWrapper>

                {parent && (
                  <TdWrapper>
                    {taxonomy.parent && (
                      <Link
                        href={tuyau.$url('taxonomies.edit', { params: [taxonomy.parent.id] })}
                        className="hover:underline"
                      >
                        {taxonomy.parent.name}
                      </Link>
                    )}
                  </TdWrapper>
                )}

                <TdWrapper>'taxonomyTypeId'</TdWrapper>

                <TdWrapper>
                  <div className="text-xs">
                    <div className="font-medium text-orange-600">
                      {taxonomy.meta?.articles_count || 0} Articles
                    </div>
                    <div>{taxonomy.meta?.collections_count || 0} Collections</div>
                    {hasChildren(taxonomy) && (
                      <div className="font-medium text-blue-600">
                        {taxonomy.meta.children_count} Children
                      </div>
                    )}
                  </div>
                </TdWrapper>

                <TdWrapper>
                  <div className="flex items-center gap-2">
                    {/* Always show View Children button for any taxonomy with children */}
                    {hasChildren(taxonomy) && (
                      <Button size="small" onClick={() => viewChildren(taxonomy)}>
                        View {taxonomy.meta.children_count} Children
                      </Button>
                    )}

                    {/* Always show Add Child button */}
                    <Button
                      size="small"
                      onClick={() => {
                        router.get(
                          tuyau.$url('taxonomies.create', {
                            query: { parentId: taxonomy.id },
                          })
                        )
                      }}
                    >
                      Add Child
                    </Button>

                    <Button variant="danger" size="small" onClick={() => onDelete(taxonomy)}>
                      Delete
                    </Button>
                  </div>
                </TdWrapper>
              </TrWrapper>
            ))}
          </TbodyWrapper>
        </TableWrapper>
      </div>
    </div>
  )
}
