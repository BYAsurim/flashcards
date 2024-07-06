import { IconButton, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar/avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

export const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton}>
          <Avatar />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          <div className={s.profileInfo}>
            <Avatar />
            <div>
              <Typography variant={'subtitle2'}>Ivan</Typography>
              <Typography className={s.email} variant={'caption'}>
                blablabla@mail.ru
              </Typography>
            </div>
          </div>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <DropdownMenu.Item className={s.dropdownMenuItem}>
            <IconButton
              as={'a'}
              className={s.item}
              height={'16'}
              href={'#'}
              iconId={'layer'}
              variant={'secondary'}
              viewBox={'0 0 16 16'}
              width={'16'}
            >
              My Profile
            </IconButton>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <DropdownMenu.Item className={s.dropdownMenuItem}>
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
