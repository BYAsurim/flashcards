import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ControlledTextField } from '@/components/controlled'
import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { Button, IconButton } from '@/components/ui'
import { Modal } from '@/components/ui/modals'
import { AuthErrorResponse } from '@/services/auth'
import { useUpdateDeckMutation } from '@/services/decks/decksApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editDeckModal.module.scss'
// import s from '@/components/ui/modals/Modal.module.scss'

export type DefaultValues = {
  cover?: null | string
  id: string
} & EditFormValues

type Props = {
  deckId?: string
  defaultValues?: DefaultValues
  // onConfirm: (data: { cover?: File | null } & EditFormValues) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}
const newDeckSchema = z.object({
  isPrivate: z.boolean().default(false).optional(),
  name: z.string().trim().min(3).max(500),
})

export type EditFormValues = z.infer<typeof newDeckSchema>

export const EditDeck = ({ defaultValues, onOpenChange, open = false, title }: Props) => {
  const [updateDeck] = useUpdateDeckMutation()
  const [img, setImg] = useState<File | null>(null)
  const [preview, setPreview] = useState<null | string>(null)
  const { control, handleSubmit, reset } = useForm<EditFormValues>({
    defaultValues: {
      isPrivate: defaultValues?.isPrivate || false,
      name: defaultValues?.name || '',
    },
    resolver: zodResolver(newDeckSchema),
  })

  useEffect(() => {
    if (defaultValues?.cover) {
      setPreview(defaultValues?.cover)
    }
  }, [defaultValues?.cover])

  useEffect(() => {
    if (img) {
      // создать ссылку на файл
      const newPreview = URL.createObjectURL(img)

      // зачищаем старое превью чтобы не хранилось в памяти
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      // зачищаем новое превью чтобы не хранилось в памяти
      return () => URL.revokeObjectURL(newPreview)
    }
  }, [img, preview])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setImg(file)
    }
  }

  const updateDeckHandler = async (data: EditFormValues) => {
    try {
      await updateDeck({ ...data, cover: img, id: defaultValues?.id || '' }).unwrap()
      reset()
      setImg(null)
      onOpenChange(false)
      toast.success('update deck successful')
    } catch (e: unknown) {
      const err = e as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Uncaught error.')
      onOpenChange(false)
    }
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={title}>
      <form className={s.form} onSubmit={handleSubmit(updateDeckHandler)}>
        {preview && <img alt={'preview image'} className={s.preview} src={preview} />}
        <label>
          <input onChange={uploadHandler} style={{ display: 'none' }} type={'file'} />
          <IconButton
            as={'span'}
            fullWidth
            height={'16'}
            iconId={'imageIcon'}
            variant={'secondary'}
            viewBox={'0 0 24 24'}
            width={'16'}
          >
            Upload image
          </IconButton>
        </label>
        <ControlledTextField
          aria-describedby={'format'}
          control={control}
          label={'Name Deck'}
          name={'name'}
        />
        <ControlledCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
        <div className={s.footer}>
          <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>
            Cansel
          </Button>
          <Button type={'submit'}>Update</Button>
        </div>
      </form>
    </Modal>
  )
}
