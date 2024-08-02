import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/Logo.svg'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { User } from '@/services/auth'

import s from './header.module.scss'

type HeaderProps = {
  children?: ReactNode
  isLoggedIn: boolean
  logout: () => void
  profile?: User
}

export const Header = ({ children, isLoggedIn, logout, profile }: HeaderProps) => {
  if (children) {
    return <header className={s.header}>{children}</header>
  }

  return (
    <header className={s.header}>
      <Link to={'/'}>
        <img alt={'logo'} src={logo} style={{ width: '156px' }} />
      </Link>
      {isLoggedIn ? (
        <Dropdown logout={logout} profile={profile} />
      ) : (
        <Button as={Link} className={s.headerButton} to={'/login'} variant={'secondary'}>
          Sign in
        </Button>
      )}
    </header>
  )
}
