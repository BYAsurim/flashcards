import { FC } from 'react'
import { toast } from 'react-toastify'

import { Icon, IconButton } from '@/components/ui'
import { router } from '@/router/router'
import { Deck } from '@/services/decks/decks.types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './edit-dropdown.module.scss'

type Props = {
  deck?: Deck
  deleteDeckOpen: (value: boolean) => void
  editDeckOpen: (value: boolean) => void
}

export const EditDropdown: FC<Props> = ({ deck, deleteDeckOpen, editDeckOpen }) => {
  const handlerLearnButton = async () => {
    if (deck?.cardsCount === 0) {
      toast.info('Deck is empty', { position: 'top-center' })
    } else {
      await router.navigate(`/deck/${deck?.id}/learn`)
    }
  }

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
              onClick={handlerLearnButton}
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
              onClick={() => editDeckOpen(true)}
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
              onClick={() => deleteDeckOpen(true)}
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
