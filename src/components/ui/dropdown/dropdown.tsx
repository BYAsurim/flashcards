import { Link } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar/avatar'
import { IconButton } from '@/components/ui/icon-button'
import { Typography } from '@/components/ui/typography'
import { User } from '@/services/auth'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

type DropdownProps = {
  logout?: () => void
  profile?: User
}
export const Dropdown = ({ logout, profile }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton} type={'button'}>
          <Avatar userImg={`${profile?.avatar ? profile.avatar : ''}`} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          <div className={s.profileInfo}>
            <Avatar userImg={`${profile?.avatar ? profile.avatar : ''}`} />
            <div>
              <Typography as={'p'} variant={'subtitle2'}>
                {profile?.name}
              </Typography>
              <Typography as={'p'} className={s.email} variant={'caption'}>
                {profile?.email}
              </Typography>
            </div>
          </div>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <Link style={{ all: 'unset' }} to={'/myProfile'}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>
              <IconButton
                as={'button'}
                className={s.item}
                height={'16'}
                iconId={'layer'}
                variant={'secondary'}
                viewBox={'0 0 16 16'}
                width={'16'}
              >
                My Profile
              </IconButton>
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <DropdownMenu.Item className={s.dropdownMenuItem} onClick={logout}>
            <IconButton
              as={'a'}
              className={s.item}
              height={'16'}
              href={'#'}
              iconId={'logout'}
              viewBox={'0 0 16 16'}
              width={'16'}
            >
              Sign Out
            </IconButton>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={s.DropdownMenuArrowBorder} />
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
