import { ButtonProps, IconButton, IconButtonProps } from '@/components/ui'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './item.module.scss'
type Props = ButtonProps & IconButtonProps
export const Item = (props: Props) => {
  const { children, iconId } = props

  return (
    <DropdownMenu.Item className={s.dropdownMenuItem}>
      <IconButton
        className={s.item}
        height={'16'}
        iconId={iconId}
        viewBox={'0 0 16 16'}
        width={'16'}
      >
        {children}
      </IconButton>
    </DropdownMenu.Item>
  )
}
