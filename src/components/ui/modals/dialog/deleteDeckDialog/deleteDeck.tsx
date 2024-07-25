import { Button, Typography } from '@/components/ui'
import { Modal } from '@/components/ui/modals'
import { useDeleteDeckMutation } from '@/services/decks/decksApi'

import s from '@/components/ui/modals/Modal.module.scss'

type Props = {
  id: string
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

export const DeleteDeck = ({ id, onOpenChange, open, title }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const onDelete = () => {
    deleteDeck({ id }).then(() => onOpenChange(false))
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={title}>
      <Typography variant={'body2'}>
        Do you really want to remove the deck? All cards will be deleted.
      </Typography>
      <div className={s.footer}>
        <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>
          Cansel
        </Button>
        <Button onClick={onDelete} type={'button'}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}
