import { FieldInput } from '@website/design-system/src/molecules/field/field.js'
import { ChangeEvent } from 'react'

type Props = {
  name: string
  label: string
  value?: string
  className?: string
  onChange?: (e: ChangeEvent) => void
}

export function FieldElement({ value, onChange, name, label, className }: Props) {
  return (
    <div className="col-span-full">
      <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <FieldInput
          onChange={onChange}
          value={value}
          name={name}
          className={[
            className,
            'border border-1 border-black/10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
          ].join(' ')}
          placeholder="lorem..."
        />
      </div>
    </div>
  )
}
