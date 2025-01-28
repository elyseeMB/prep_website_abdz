import { JSX, RefObject } from 'react'

type Props = {
  value: string
  name: string
  type: string
} & JSX.IntrinsicElements['input'] &
  JSX.IntrinsicElements['textarea'] &
  JSX.IntrinsicElements['select']

export function Field({
  children,
  onChange,
  ref,
  type = 'text',
  value,
  name,
  ...props
}: Partial<Props>) {
  if (['text', 'number'].includes(type)) {
    children = (
      <input
        ref={ref}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
        {...props}
      />
    )
  } else if (type === 'textarea') {
    children = (
      <textarea
        defaultValue={value}
        name={value}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      ></textarea>
    )
  } else {
    throw new Error('Cannot render this tye of field : ' + type)
  }

  return (
    <fieldset>
      <div className="flex items-center rounded-md bg-white pl-3">{children}</div>
    </fieldset>
  )
}
