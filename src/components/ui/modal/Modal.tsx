import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button, Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './Modal.module.scss'

export type ModalProps = {
  children: ReactNode
  description?: string
  onCancel?: () => void
  onConfirm?: () => void
  onOpenChange: (open: boolean) => void
  open?: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, description, title, ...rest }: ModalProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Trigger asChild>
      <Button type={'button'}>Edit profile</Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <Dialog.Title className={s.ModalHeader}>
          <Typography as={'h3'} variant={'h3'}>
            {title}
          </Typography>
          <Dialog.Close>
            <button aria-label={'Close'} className={'IconButton'} type={'button'}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Title>
        {description && (
          <Dialog.Description className={s.DialogDescription}>{description}</Dialog.Description>
        )}
        <div className={s.contentWrap}>{children}</div>
        <div className={s.footer}>
          <Dialog.Close asChild>
            <Button type={'button'} variant={'secondary'}>
              Cansel
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button type={'button'}>Save changes</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
