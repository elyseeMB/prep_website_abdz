import React, { ChangeEvent, useEffect, useRef } from 'react'
import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.min.css'
import { useTomSelect } from '~/hooks/useTomSelect.js'

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
  create: boolean
}

export function InputTags({
  placeholder = 'Ajoutez des tags...',
  options = {},
  onChange,
  className = '',
  create = true,
}: InputTagsProps) {
  const inputRef = useTomSelect({
    placeholder,
    options,
    onChange,
    create,
  }) as React.RefObject<HTMLInputElement>
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
  create?: boolean
}

export function SelectTags({
  items,
  placeholder = 'Sélectionnez des options...',
  options = {},
  onChange,
  name,
  className = '',
  multiple = true,
  create = false,
}: SelectTagsProps) {
  const selectRef = useTomSelect({
    placeholder,
    options,
    onChange,
    multiple,
    create,
  }) as React.RefObject<HTMLSelectElement>

  return (
    <select name={name} ref={selectRef} multiple={multiple} className={className}>
      {items.map((option, index) => (
        <option key={index} value={option.id}>
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
