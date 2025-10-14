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
import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core'

import { HTMLAttributes, useState } from 'react'

import { closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from '~/components/ui/sortableItem/sortableItem.js'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { createPortal } from 'react-dom'
import { Item } from '~/components/ui/sortableItem/item.js'
import { Sortable } from '~/components/ui/sortableItem/sortable.js'
import { SortableProvider } from '~/components/ui/sortableItem/sortableContext.js'
import { MultipleContainers } from '~/components/ui/sortableItem/multi/multiContainer.js'
import { SortableTree } from '~/components/ui/sortableItem/tree/sortableTree.js'

type Params = {
  parent?: TaxonomyDto | null
  taxonomies?: TaxonomyDto[]
  taxonomyTypeId?: number
  breadcrumbs?: Array<{ id: number; name: string }>
  treeItems?: []
}

function IconElement(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
      </svg>
    </>
  )
}

function sanitizeInput(data: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(data as Record<string, any>).map(([k, v]) => [
      k,
      typeof v === 'string' ? v.trim() : v,
    ])
  )
}

export default function Index(props: Params) {
  const { parent, taxonomies = [], taxonomyTypeId, breadcrumbs = [] } = props

  const handleDelete = (id: UniqueIdentifier) => {
    if (
      confirm(
        `Are you sure you'd like to delete the taxonomy ? Once deleted, it'll be gone forever.`
      )
    ) {
      router.delete(tuyau.$url('taxonomies.destroy', { params: [id] }))
    }
  }

  const handleUpdate = (id: UniqueIdentifier, data: any, oldData: any) => {
    const dataParse = sanitizeInput(data)

    if (oldData) {
      if (dataParse.name.trim() === oldData.trim()) {
        return
      }
    }

    router.put(
      tuyau.$url('taxonomies.update', {
        params: [id],
      }),
      dataParse,
      { preserveState: true, preserveScroll: true }
    )
  }

  const treeItemsElements = props.treeItems![0]

  // console.log(props.treeItems)

  function filterKey(item) {
    const keyToPick = ['id', 'children', 'collapsed', 'parentId', 'depth', 'index', 'organisation']
    const result = {}
    keyToPick.forEach((key) => {
      if (key === 'children' && Array.isArray(item.children)) {
        result.children = item.children.map((child) => filterKey(child))
      } else {
        result[key] = item[key]
      }
    })
    return result
  }

  const handleMerge = (data) => {
    const parseData = data.map((item) => filterKey(item))
    const tree = JSON.stringify(parseData)
    router.post(
      tuyau.$url('taxonomies.tree'),
      {
        tree,
      },
      { preserveState: true, preserveScroll: true }
    )
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

  // const a = props.taxonomies.map((item) => item.organisation).filter(Boolean)

  const a = props.taxonomies?.map((item) => ({
    ...item,
    ...item.organisation?.tree[0],
  }))

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

      <div className="flex flex-col item-center justify-center">
        <span> {taxonomies.length} taxonomies </span>
        <div className="bg-white rounded-lg border-b border-b-slate-200 overflow-hidden shadow"></div>
        {/* 
        <SortableProvider
          itemCount={taxonomies.length}
          initialItems={taxonomies}
          onDeleteCallback={handleDelete}
          onUpdateCallback={handleUpdate}
        >
          <Sortable
            items={taxonomies}
            itemCount={taxonomies.length}
            strategy={verticalListSortingStrategy}
            handle
            removable
          />
        </SortableProvider> */}

        {/* <SortableProvider
          itemCount={taxonomies.length}
          initialItems={taxonomies}
          onDeleteCallback={handleDelete}
          onUpdateCallback={handleUpdate}
        >
          <MultipleContainers handle itemCount={taxonomies.length} vertical />
        </SortableProvider> */}

        <SortableProvider
          itemCount={taxonomies.length}
          initialItems={taxonomies}
          onDeleteCallback={handleDelete}
          onUpdateCallback={handleUpdate}
          onMergeCallback={handleMerge}
        >
          <SortableTree collapsible indicator removable />
        </SortableProvider>
      </div>
    </div>
  )
}
