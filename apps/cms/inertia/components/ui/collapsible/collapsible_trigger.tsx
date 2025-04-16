import { PropsWithChildren } from 'react'
import { useToggle } from '~/hooks/useToogle.ts'

export function CollapsibleTrigger({
  children,
  label,
  className,
}: PropsWithChildren<{
  label?: string
  className?: string
}>) {
  const [toggle, setToogle] = useToggle(false)

  return (
    <div id="accordion-open" data-accordion="open">
      <h2 id="accordion-open-heading-1">
        <button
          onClick={setToogle}
          type="button"
          className={[
            'flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 ring-0.5 focus:ring-4 focus:ring-lightBlue-200 ring-gray-200',
            toggle === true ? 'bg-lightBlue-100/50' : '',
            className,
          ].join(' ')}
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">{label}</span>
          <svg
            data-accordion-icon
            className={[
              'w-3 h-3 shrink-0',
              toggle === true ? 'rotate-0 color-blue' : 'rotate-180',
            ].join(' ')}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {toggle && <>{children}</>}
    </div>
  )
}
