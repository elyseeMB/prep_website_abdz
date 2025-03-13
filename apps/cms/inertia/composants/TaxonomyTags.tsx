import { ChangeEvent, useEffect, useRef } from 'react'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.min.css'

type Options = {
  placeholder?: string
  hideSelected: boolean
  persist: boolean
  create: boolean
  plugins: string[]
  closeAfterSelect: boolean
  onItemAdd: () => void
  onItemRemove: () => void
}

interface InputTagsProps {
  placeholder?: string
  options?: Partial<Options>
  onChange?: (value: string[]) => void
  className?: string
}

export function InputTags({
  placeholder = 'Ajoutez des tags...',
  options = {},
  onChange,
  className = '',
}: InputTagsProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const tomSelectRef = useRef<TomSelect | null>(null)
  options = {
    placeholder: placeholder,
    hideSelected: true,
    persist: false,
    create: true,
    plugins: ['restore_on_backspace'],
    closeAfterSelect: true,
    onItemAdd: () => {
      onChange?.(tomSelectRef.current?.items || [])
    },
    onItemRemove: () => {
      onChange?.(tomSelectRef.current?.items || [])
    },
  }

  useEffect(() => {
    if (inputRef.current && !tomSelectRef.current) {
      tomSelectRef.current = new TomSelect(inputRef.current, options)
    }

    return () => {
      if (tomSelectRef.current) {
        tomSelectRef.current.destroy()
        tomSelectRef.current = null
      }
    }
  }, [])
  return <input ref={inputRef} type="text" className={className} />
}

interface SelectTagsProps {
  items: any[]
  placeholder?: string
  options?: {}
  onChange?: (e: string[]) => void
  className?: string
  multiple?: boolean
  name?: string
}

export function SelectTags({
  items,
  placeholder = 'Sélectionnez des options...',
  options = {},
  onChange,
  name,
  className = '',
  multiple = true,
}: SelectTagsProps) {
  const selectRef = useRef<HTMLSelectElement>(null)
  const tomSelectRef = useRef<TomSelect | null>(null)

  useEffect(() => {
    if (selectRef.current && !tomSelectRef.current) {
      // Initialiser TomSelect
      tomSelectRef.current = new TomSelect(selectRef.current, {
        plugins: multiple ? ['remove_button'] : [],
        placeholder: placeholder,
        create: false,
        onItemAdd: () => {
          onChange?.(tomSelectRef.current?.items || [])
        },
        onItemRemove: () => {
          onChange?.(tomSelectRef.current?.items || [])
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

  return (
    <select name={name} ref={selectRef} multiple={multiple} className={className}>
      {items.map((option, index) => (
        <option key={index} value={option.id.props.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

// function bindBehaviour(clx: Props) {
//   const widget = new TomSelect()
// }

// Array.from([InputTags, SelectTags]).forEach(bindBehaviour)
