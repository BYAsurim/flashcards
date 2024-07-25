import { useState } from 'react'

import { Button, TextField } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/InputTypeFile/InputTypeFile'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modals'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { useCreateDeckMutation } from '@/services/decks/decksApi'
import { base64ToBlob } from '@/utils/base64ToBlob'

import s from '@/components/ui/modals/Modal.module.scss'

type Props = {
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

const CreateDeck = ({ onOpenChange, open = false, title }: Props) => {
  const [createDeck] = useCreateDeckMutation()
  const [deck, setDeck] = useState<CreateDeckArgs>({ cover: '', isPrivate: false, name: '' })

  const deckNameHandler = (name: string) => {
    setDeck({ ...deck, name })
  }
  const deckCoverHandler = (cover: string) => {
    setDeck({ ...deck, cover })
  }
  const deckIsPrivateHandler = (isPrivate: boolean) => {
    setDeck({ ...deck, isPrivate })
  }

  const createDeckHandler = () => {
    const contentType = 'image/*'
    const blob = base64ToBlob(deck.cover ?? '', contentType)
    const formData = new FormData()

    formData.append('name', deck.name || '')
    formData.append('cover', blob ?? '')
    formData.append('isPrivate', deck.isPrivate?.toString() ?? 'false')
    createDeck(formData).then(() => onOpenChange(false))
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={title}>
      <InputTypeFile fullWidth onClick={deckCoverHandler} variant={'secondary'} />
      <TextField label={'Name Deck'} onValueChange={deckNameHandler} />
      <Checkbox
        checked={deck.isPrivate ?? false}
        label={'Private Deck'}
        onCheckedChange={deckIsPrivateHandler}
      />
      <div className={s.footer}>
        <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>
          Cansel
        </Button>
        <Button onClick={createDeckHandler} type={'button'}>
          Confirm
        </Button>
      </div>
    </Modal>
  )
}

export default CreateDeck
