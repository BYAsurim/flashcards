import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { InputTypeFile } from '@/components/InputTypeFile/InputTypeFile'
import { Button, TextField } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal, ModalProps } from '@/components/ui/modals'
import { useCreateDeckMutation } from '@/services/decks/decksApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/ui/modals/Modal.module.scss'
//
// export type CreateDeckModalProps = {
//   onOpenChange: (open: boolean) => void
//   open: boolean
// } & ModalProps

type Props = {
  defaultValues?: FormValues
  onConfirm: (data: FormValues) => void
} & ModalProps

const newDeckSchema = z.object({
  cover: z.string().optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(5000),
})

type FormValues = z.infer<typeof newDeckSchema>

export const CreateDeckModal = ({
  defaultValues = { cover: '', isPrivate: false, name: '' },
  onOpenChange,
  open,
  ...rest
}: Props) => {
  const [checked, setChecked] = useState(false)
  const [createDeck] = useCreateDeckMutation()

  console.log(createDeck)
  const { handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })

  const onSubmit = handleSubmit(data => {
    debugger
    createDeck(data)
    onOpenChange?.(false)
    reset()
  })

  return (
    <Modal
      cancelText={'Cansel'}
      confirmText={'Confirm'}
      onConfirm={onSubmit}
      onOpenChange={onOpenChange}
      open={open}
      title={'Creating a New Deck'}
      {...rest}
    >
      <form onSubmit={onSubmit}>
        <InputTypeFile name={'cover'} />
        <TextField label={'Name Deck'} name={'name'} />
        <Checkbox
          checked={checked}
          label={'Private Deck'}
          name={'isPrivate'}
          onCheckedChange={() => setChecked(!checked)}
        />
        {/*<div className={s.footer}>*/}
        {/*  <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>*/}
        {/*    Cansel*/}
        {/*  </Button>*/}
        {/*  <Button onSubmit={onSubmit} type={'button'}>*/}
        {/*    Confirm*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </form>
    </Modal>
  )
}

// const fieldCoverHandler = (value: string) => {
//   const imageURL = URL.createObjectURL(dataURLtoBlob(value))
//
//   console.log(imageURL)
//   createDeckForm.append('cover', imageURL)
// }
