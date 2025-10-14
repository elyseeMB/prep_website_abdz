import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

import styles from './item.module.css'
import classNames from 'classnames'
import { Remove } from './remove/remove.tsx'
import { Handle } from './handle/handle.tsx'
import TaxonomyDto from '../../../../app/dto/taxonomy/taxonomy.ts'
import { Link, router, useForm } from '@inertiajs/react'
import { tuyau } from '~/lib/tuyau.ts'
import { Field, FieldInput } from '@website/design-system/src/molecules/field/field.tsx'
import { FieldElement } from '../form/field.tsx'
import { Button } from '@website/design-system'
import { SortableProvider, useSortableContext } from './sortableContext.tsx'
import { Collapsible } from '../collapsible/collapsible_wrapper.tsx'
import { CollapsibleTrigger } from '../collapsible/collapsible_trigger.tsx'
import { CollapsibleContent } from '../collapsible/collapsible_content.tsx'
import { Sortable } from './sortable.tsx'
import { verticalListSortingStrategy } from '@dnd-kit/sortable'

export interface Props {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  value: React.ReactNode
  onRemove?(): void
  renderItem?(args: {
    dragOverlay: boolean
    dragging: boolean
    sorting: boolean
    index: number | undefined
    fadeIn: boolean
    listeners: DraggableSyntheticListeners
    ref: React.Ref<HTMLElement>
    style: React.CSSProperties | undefined
    transform: Props['transform']
    transition: Props['transition']
    value: Props['value']
  }): React.ReactElement
  doc?: any
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        doc,
        ...props
      },
      ref
    ) => {
      const { onUpdate } = useSortableContext()

      const form = useForm({
        rootParentId: doc.rootParentId ?? null,
        name: doc.name ?? null,
        slug: doc.slug ?? null,
        description: doc.description ?? null,
      })

      const handleChange = useCallback((e: ChangeEvent) => {
        const element = e.currentTarget as HTMLInputElement
        form.setData((data) => ({ ...data, [element.name]: element.value }))
      }, [])

      const viewChildren = (id: TaxonomyDto['id']) => {
        router.get(
          tuyau.$url('taxonomies.index', {
            query: {
              parentId: id,
            },
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
          }
        )
      }

      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              'transition': [transition, wrapperStyle?.transition].filter(Boolean).join(', '),
              '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
              '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
              '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
              '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <span className={styles.Actions}>
              {onRemove ? <Remove className={styles.Remove} onClick={onRemove} /> : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span>

            <Field
              onChange={(ev) => handleChange(ev)}
              onBlur={() => onUpdate(value, form.data)}
              className={styles.Field}
              type="text"
              value={form.data.name}
              name="name"
            />
            {/* {doc.name} */}

            {/* <Link
              href={tuyau.$url('taxonomies.create', {
                query: { parentId: value },
              })}
            >
              <svg
                className={styles.Action_add}
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
              </svg>
            </Link> */}
          </div>
        </li>
      )
    }
  )
)
