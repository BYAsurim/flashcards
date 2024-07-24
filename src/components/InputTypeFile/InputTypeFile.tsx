import { ChangeEvent, useState } from 'react'

import defaultAva from '@/assets/images/reactImage.png'
import { IconButton } from '@/components/ui'

type InputTypeFileProps = {
  name?: string
  onChange?: (value: string) => void
}

export function dataURLtoBlob(dataURL: string) {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

export const InputTypeFile = ({ name, onChange }: InputTypeFileProps) => {
  const [ava, setAva] = useState(defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64)
          onChange?.(file64)
          // setAva('111')
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  return (
    <div>
      <img
        alt={'ava'}
        onError={errorHandler}
        src={isAvaBroken ? defaultAva : ava}
        style={{ width: '100px' }}
      />
      <label>
        <input name={name} onChange={uploadHandler} style={{ display: 'none' }} type={'file'} />
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
    </div>
  )
}
