import { ReactNode } from 'react'

import logo from '@/assets/images/Logo.svg'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'

import s from './header.module.scss'

type HeaderProps = {
  children?: ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  const isLoggedIn = true

  if (children) {
    return <header className={s.header}>{children}</header>
  }

  return (
    <header className={s.header}>
      <img alt={'logo'} src={logo} style={{ width: '156px' }} />
      {isLoggedIn ? (
        <Dropdown />
      ) : (
        <Button className={s.headerButton} variant={'secondary'}>
          Sign in
        </Button>
      )}
    </header>
  )
}
