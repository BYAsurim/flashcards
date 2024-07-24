import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button, Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './Modal.module.scss'

export type ModalProps = {
  cancelText?: string
  children?: ReactNode
  confirmText?: string
  cover?: string
  description?: string
  onCancel?: () => void
  onConfirm?: () => void
  onOpenChange: (open: boolean) => void
  open?: boolean
  title?: string
  triggerButtonName?: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({
  cancelText,
  children,
  confirmText,
  description,
  onCancel,
  onConfirm,
  title,
  triggerButtonName,
  ...rest
}: ModalProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Trigger asChild>
      <Button type={'button'}>{triggerButtonName ?? 'Edit profile'}</Button>
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
        <div className={s.contentWrap}>
          <>
            {children}
            <div className={s.footer}>
              {cancelText && (
                <Button onClick={onCancel} variant={'secondary'}>
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button onClick={onConfirm} type={'button'}>
                  {confirmText}
                </Button>
              )}
            </div>
          </>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
