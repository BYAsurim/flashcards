import logo from '@/assets/images/Logo.svg'
import { Button, Dropdown } from '@/components/ui'

import s from './header.module.scss'

export const Header = () => {
  const isLoggedIn = false

  return (
    <header className={s.header}>
      <img src={logo} style={{ width: '156px' }} />
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
