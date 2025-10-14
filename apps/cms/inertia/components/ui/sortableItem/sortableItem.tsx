import { useSortable } from '@dnd-kit/sortable'
import { Item } from './item.tsx'
import { UniqueIdentifier } from '@dnd-kit/core'

import { AnimateLayoutChanges, NewIndexGetter } from '@dnd-kit/sortable'
import { useMountStatus } from '~/hooks/useMountStatus.ts'

interface SortableItemProps {
  containerId?: UniqueIdentifier
  animateLayoutChanges?: AnimateLayoutChanges
  disabled?: boolean
  getNewIndex?: NewIndexGetter
  id: UniqueIdentifier
  index: number
  handle: boolean
  useDragOverlay?: boolean
  onRemove?(id: UniqueIdentifier): void
  style(values: any): React.CSSProperties
  renderItem?(args: any): React.ReactElement
  onDelete?(id: number): void
  wrapperStyle: any
}

export function SortableItem({
  containerId,
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  index,
  onRemove,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
  onDelete,
  ...props
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  })

  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  return (
    <Item
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
        containerId,
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      fadeIn={mountedWhileDragging}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
      doc={props}
    />
  )
}
