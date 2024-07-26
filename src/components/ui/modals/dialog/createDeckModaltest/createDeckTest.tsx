// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
export {}
// import { ControlledTextField } from '@/components/controlled'
// import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
// import { Button } from '@/components/ui'
// import { InputTypeFile } from '@/components/ui/InputTypeFile/InputTypeFile'
// import { Modal } from '@/components/ui/modals'
// import { useCreateDeckMutation } from '@/services/decks/decksApi'
// import { base64ToBlob } from '@/utils/base64ToBlob'
// import { z } from 'zod'
//
// import s from '@/components/ui/modals/Modal.module.scss'
//
// type Props = {
//   onOpenChange: (open: boolean) => void
//   open: boolean
//   title?: string
// }
// const newDeckSchema = z.object({
//   isPrivate: z.boolean(),
//   name: z.string(),
// })
//
// type FormValues = z.infer<typeof newDeckSchema>
//
// const CreateDeck = ({ onOpenChange, open = false, title }: Props) => {
//   const [createDeck] = useCreateDeckMutation()
//   const [img, setImg] = useState<null | string>(null)
//   const { control, handleSubmit, reset } = useForm<FormValues>({
//     defaultValues: {
//       isPrivate: false,
//       name: '',
//     },
//   })
//
//   const deckCoverHandler = (cover: string) => {
//     setImg(cover)
//   }
//
//   const createDeckHandler = async (data: FormValues) => {
//     const contentType = 'image/*'
//     const blob = base64ToBlob(img ?? '', contentType)
//
//     const formData = new FormData()
//
//     formData.append('name', data.name || '')
//     formData.append('cover', blob ?? '')
//     formData.append('isPrivate', data.isPrivate ? 'true' : 'false')
//     try {
//       await createDeck(formData).unwrap()
//       reset()
//       setImg(null)
//       onOpenChange(false)
//     } catch (error) {
//       alert(error)
//       onOpenChange(false)
//     }
//   }
//
//   return (
//     <Modal onOpenChange={onOpenChange} open={open} title={title}>
//       <form
//         onSubmit={handleSubmit(createDeckHandler)}
//         style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
//       >
//         <InputTypeFile fullWidth onClick={deckCoverHandler} variant={'secondary'} />
//         <ControlledTextField
//           aria-describedby={'format'}
//           control={control}
//           label={'Name Deck'}
//           name={'name'}
//         />
//         <ControlledCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
//         <div className={s.footer}>
//           <Button onClick={() => onOpenChange(false)} type={'button'} variant={'secondary'}>
//             Cansel
//           </Button>
//           <Button type={'submit'}>Confirm</Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }
//
// export default CreateDeck
