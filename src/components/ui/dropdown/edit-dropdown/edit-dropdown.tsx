import { Icon, IconButton } from '@/components/ui'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './edit-dropdown.module.scss'

export const EditDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton} type={'button'}>
          <Icon
            className={s.triggerButton}
            height={'16'}
            iconId={'dotMenu'}
            viewBox={'0 0 16 16'}
            width={'16'}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={s.dropdownMenuItem}>
            <IconButton
              as={'a'}
              className={s.item}
              height={'16'}
              href={'#'}
              iconId={'play'}
              viewBox={'0 0 16 16'}
              width={'16'}
            >
              Learn
            </IconButton>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <DropdownMenu.Item className={s.dropdownMenuItem}>
            <IconButton
              className={s.item}
              height={'16'}
              iconId={'editOutline'}
              viewBox={'0 0 16 16'}
              width={'16'}
            >
              Edit
            </IconButton>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
          <DropdownMenu.Item className={s.dropdownMenuItem}>
            <IconButton
              className={s.item}
              height={'16'}
              iconId={'trash'}
              viewBox={'0 0 16 16'}
              width={'16'}
            >
              Delete
            </IconButton>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={s.DropdownMenuArrowBorder} />
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
