import { CSSProperties, ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'

export type PageProps = {
  marginTop?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ className, marginTop = '33px', style, ...props }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
    }
    const styles = { marginTop, ...style }

    return <div {...props} className={classNames.root} ref={ref} style={styles} />
  }
)
