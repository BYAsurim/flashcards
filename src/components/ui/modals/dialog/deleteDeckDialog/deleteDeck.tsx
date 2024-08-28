import { toast } from 'react-toastify'

import { Button, Typography } from '@/components/ui'
import { Modal } from '@/components/ui/modals'
import { router } from '@/router/router'
import { CardId } from '@/services/cards/cardsApi.types'
import { DeleteDeckArgs } from '@/services/decks/decks.types'

import s from '@/components/ui/modals/Modal.module.scss'

type Props = {
  cardId?: string
  description?: string
  id?: string
  onDeleteCard?: (id: CardId) => void
  onDeleteDeck?: (id: DeleteDeckArgs) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

export const DeleteDeck = ({
  cardId,
  description = 'Do you really want to remove the deck? All cards will be deleted.',
  id,
  onDeleteCard,
  onDeleteDeck,
  onOpenChange,
  open,
  title,
}: Props) => {
  const onDeleteHandler = async () => {
    try {
      if (id && onDeleteDeck) {
        onDeleteDeck({ id })
        await router.navigate('/')
        toast.success('delete deck successful')
      } else if (cardId && onDeleteCard) {
        onDeleteCard({ id: cardId })
        toast.success('delete card successful')
      }
    } catch (e: any) {
      toast.error('delete failed')
    } finally {
      onOpenChange(false)
    }
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={title}>
      <Typography variant={'body2'}>{description}</Typography>
      <div className={s.footer}>
        <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>
          Cansel
        </Button>
        <Button onClick={onDeleteHandler} type={'button'}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}
