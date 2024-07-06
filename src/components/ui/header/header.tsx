import logo from '@/assets/images/Logo.svg'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'

import s from './header.module.scss'

export const Header = () => {
  const isLoggedIn = true

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
