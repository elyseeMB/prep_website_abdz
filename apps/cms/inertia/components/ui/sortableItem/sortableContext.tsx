import { UniqueIdentifier } from '@dnd-kit/core'
import { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { createRange } from '~/utils/createRange.ts'

type SortableContextType = {
  items: any[]
  setItems: React.Dispatch<React.SetStateAction<any[]>>
  activeId: UniqueIdentifier | null
  setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>
  onDelete: (id: UniqueIdentifier) => void
  onUpdate: (id: UniqueIdentifier, data: any, oldData?: any) => void
  onMerge: (data: any) => void
}

type SortableProviderProps = {
  initialItems: any[]
  itemCount: number
  children: ReactNode
  onDeleteCallback?: (id: UniqueIdentifier) => void
  onUpdateCallback?: (id: UniqueIdentifier, data: any, oldData?: any) => void
  onMergeCallback?: (data: any) => void
}

const SortableContext = createContext<SortableContextType | undefined>(undefined)

export function SortableProvider({
  initialItems,
  itemCount,
  children,
  onDeleteCallback,
  onUpdateCallback,
  onMergeCallback,
}: SortableProviderProps) {
  const [items, setItems] = useState(
    () => initialItems ?? createRange<UniqueIdentifier>(itemCount, (index) => index)
  )
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const onDelete = useCallback(
    (id: UniqueIdentifier) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      if (onDeleteCallback) {
        onDeleteCallback(id)
      }
    },
    [onDeleteCallback]
  )

  const onUpdate = useCallback(
    (id: UniqueIdentifier, data: any, oldData: any) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, ...data } : item))
      )

      // Call the external callback if provided
      if (onUpdateCallback) {
        onUpdateCallback(id, data, oldData)
      }
    },
    [onUpdateCallback]
  )

  const onMerge = useCallback(
    (data: any) => {
      // Créer une copie profonde pour éviter toute référence partagée
      const finalData = JSON.parse(JSON.stringify(data))

      // Mettre à jour l'état
      setItems(finalData)

      // Utiliser queueMicrotask pour s'assurer que l'appel du callback se fait après la mise à jour
      if (onMergeCallback) {
        queueMicrotask(() => {
          onMergeCallback(finalData)
        })
      }
    },
    [onMergeCallback]
  )

  const value = {
    items,
    setItems,
    activeId,
    setActiveId,
    onDelete,
    onUpdate,
    onMerge,
  }

  return <SortableContext.Provider value={value}>{children}</SortableContext.Provider>
}

export function useSortableContext() {
  const context = useContext(SortableContext)

  if (context === undefined) {
    throw new Error('useSortableContext must be used within a SortableProvider')
  }

  return context
}
