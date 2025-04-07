import { useEffect, useRef } from 'react'
import TomSelect from 'tom-select'
import { TomInput } from 'tom-select/dist/esm/types/core.js'

interface TomSelectOptions {
  items: any[]
  placeholder?: string
  options?: {}
  onChange?: (e: string[]) => void
  className?: string
  create: boolean | undefined
  multiple?: boolean
  name?: string
}

export function useTomSelect(config: Partial<TomSelectOptions> = {}) {
  const elementRef = useRef<TomInput>(null)
  const tomSelectRef = useRef<TomSelect | null>(null)

  useEffect(() => {
    if (elementRef.current && !tomSelectRef.current) {
      tomSelectRef.current = new TomSelect(elementRef.current, {
        plugins: config.multiple ? ['remove_button'] : [],
        placeholder: config.placeholder,
        create: config.create !== undefined ? config.create : false,
        onItemAdd: () => {
          config.onChange?.(tomSelectRef.current?.items || [])
        },
        onItemRemove: () => {
          config.onChange?.(tomSelectRef.current?.items || [])
        },
      })
    }
    return () => {
      if (tomSelectRef.current) {
        tomSelectRef.current.destroy()
        tomSelectRef.current = null
      }
    }
  }, [])

  return elementRef
}
