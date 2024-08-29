import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, TextField } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/InputTypeFile/InputTypeFile'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modals'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { base64ToBlob } from '@/utils/base64ToBlob'

import s from '@/components/ui/modals/Modal.module.scss'

type Props = {
  createDeck: (data: FormData) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

const CreateDeck = ({ createDeck, onOpenChange, open = false, title }: Props) => {
  // @ts-ignore
  const [deck, setDeck] = useState<CreateDeckArgs>({ cover: '', isPrivate: false, name: '' })

  const deckNameHandler = (name: string) => {
    setDeck({ ...deck, name })
  }
  const deckCoverHandler = (cover: string) => {
    // @ts-ignore
    setDeck({ ...deck, cover })
  }
  const deckIsPrivateHandler = (isPrivate: boolean) => {
    setDeck({ ...deck, isPrivate })
  }

  const createDeckHandler = async () => {
    const contentType = 'image/*'
    // @ts-ignore
    const blob = base64ToBlob(deck.cover ?? '', contentType)
    const formData = new FormData()

    formData.append('name', deck.name || '')
    formData.append('cover', blob ?? '')
    formData.append('isPrivate', deck.isPrivate?.toString() ?? 'false')
    try {
      createDeck(formData)
      onOpenChange(false)
    } catch (e: any) {
      toast.error('some Error on create deck')
    }
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
