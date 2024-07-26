import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <Header />
        <main className={s.main}>{<Outlet />}</main>
      </div>
    )
  }
)
