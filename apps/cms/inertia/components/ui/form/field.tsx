import { FieldInput } from '@website/design-system/src/molecules/field/field.js'
import { ChangeEvent, useContext } from 'react'
import { FormContext } from './formComponent.tsx'

type Props = {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  name: string
  placeholder?: string
  label: string
  value?: string
  className?: string
  checked?: boolean
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete']
  onChange?: (e: ChangeEvent) => void
}

export function FieldElement({
  value,
  placeholder,
  type,
  onChange,
  name,
  label,
  className,
  checked = false,
  autoComplete = 'additional-name',
}: Props) {
  const { errors, emptyError, loading } = useContext(FormContext)
  const error = errors[name] || null
  return (
    <div className="col-span-full">
      <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        {error && <span>{error}</span>}
        <FieldInput
          onInput={() => emptyError(name)}
          readOnly={loading}
          checked={checked}
          autoComplete={autoComplete}
          type={type}
          onChange={onChange}
          value={value}
          name={name}
          className={[
            className,
            'border border-1 border-black/10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
          ].join(' ')}
          placeholder={placeholder ?? 'Lorem...'}
        />
      </div>
    </div>
  )
}
