import { CSSProperties, forwardRef } from 'react'

import styles from './actions.module.css'
import classNames from 'classnames'

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: CSSProperties['cursor']
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(styles.Action, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    )
  }
)
