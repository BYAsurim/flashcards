import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'signUp'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T> /* посмотреть типизацию */

export const Typography = <T extends ElementType = 'span'>(props: TypographyProps<T>) => {
  const { as: Component = 'span', children, className, variant = 'body1', ...rest } = props

  return (
    <Component className={`${s[variant]} ${className}`} {...rest}>
      {children}
    </Component>
  )
}
//может спан заменить на 'p'??
