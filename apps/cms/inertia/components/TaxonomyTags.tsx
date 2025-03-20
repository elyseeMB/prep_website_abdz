import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
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
  create?: boolean
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
  onChange?: (e: number[]) => void
  className?: string
  multiple?: boolean
  name?: string
  create?: boolean
  taxonomyIds?: number[]
  value?: any
}

export function SelectTags({
  taxonomyIds,
  items,
  placeholder = 'Sélectionnez des options...',
  options = {},
  onChange,
  name,
  className = '',
  multiple = true,
  create = false,
  value,
}: SelectTagsProps) {
  // Utilisez useCallback pour éviter trop de re-rendus
  const handleChange = React.useCallback(
    (selectedValues: string[]) => {
      if (onChange) {
        // Convertir en nombres si nécessaire
        const numericValues = selectedValues.map((v) => parseInt(v, 10))
        onChange(numericValues)
      }
    },
    [onChange]
  )

  // Passez handleChange à useTomSelect
  const selectRef = useTomSelect({
    placeholder,
    options,
    onChange: handleChange,
    multiple,
    create,
  }) as React.RefObject<HTMLSelectElement>

  // Préparez les valeurs par défaut
  const defaultValues = taxonomyIds || []

  return (
    <select
      name={name}
      ref={selectRef}
      multiple={multiple}
      className={className}
      defaultValue={defaultValues.map((id) => id.toString())}
    >
      {items.map((option, index) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
