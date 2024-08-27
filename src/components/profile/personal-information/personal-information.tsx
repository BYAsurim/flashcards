import { useState } from 'react'

import ava from '@/assets/images/default-avatar.jpg'
import { Button, Card, IconButton, TextField, Typography } from '@/components/ui'
import { InputTypeFile } from '@/components/ui/InputTypeFile/InputTypeFile'
import { router } from '@/router/router'
import { base64ToBlob } from '@/utils/base64ToBlob'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './personal-information.module.scss'

type Props = {
  avatar?: string
  email?: string
  logOut: () => void
  name?: string
  onDelete: () => void
  upDateProfile: (data: FormData) => void
}

export const PersonalInformation = (props: Props) => {
  const { avatar, email, logOut, name = 'DefaultName', onDelete, upDateProfile } = props
  const [editMode, setEditMode] = useState(false)
  const [editModeAva, setEditModeAva] = useState(false)
  const editModeHandler = () => {
    setEditMode(!editMode)
  }
  const upDateProfileHandler = (data: FormData) => {
    upDateProfile(data)
    setEditModeAva(false)
    setEditMode(false)
  }
  const goToMain = async () => {
    await router.navigate('/')
  }

  return (
    <Card className={s.card}>
      <div className={s.titleWrapper}>
        <Typography className={s.title} variant={'h1'}>
          Personal information
        </Typography>
        <Cross2Icon className={s.closeButton} onClick={goToMain} />
      </div>
      <div className={s.avatarWrap}>
        {avatar ? <img alt={'avatar'} src={avatar} /> : <img alt={'avatar'} src={ava} />}

        <IconButton
          disabled={editMode}
          iconId={'editOutline'}
          onClick={() => setEditModeAva(prevState => !prevState)}
          variant={'secondary'}
        />
      </div>
      {editMode && <EditOn oldName={name} upDateProfile={upDateProfileHandler} />}
      {editModeAva && <EditOnAva upDateProfile={upDateProfileHandler} />}
      {!editMode && (
        <EditOff
          disabled={editModeAva}
          email={email}
          logOut={logOut}
          name={name}
          onClick={editModeHandler}
          onDelete={onDelete}
        />
      )}
    </Card>
  )
}

export type EditOnProps = {
  oldName?: string
  upDateProfile: (data: FormData) => void
}

export const EditOn = ({ oldName, upDateProfile }: EditOnProps) => {
  const [name, setName] = useState('')
  const onChangeHandler = (value: string) => {
    setName(value)
  }
  const onClickHandler = () => {
    const formData = new FormData()

    formData.append('name', name ?? '')
    upDateProfile(formData)
  }

  return (
    <div className={s.editProfile}>
      <TextField
        className={s.field}
        defaultValue={oldName}
        label={'Nickname'}
        onValueChange={onChangeHandler}
        placeholder={oldName}
      />
      <Button className={s.saveChangesButton} fullWidth onClick={onClickHandler}>
        Save Changes
      </Button>
    </div>
  )
}

type EditOnAvaProps = {
  upDateProfile: (data: FormData) => void
}
export const EditOnAva = ({ upDateProfile }: EditOnAvaProps) => {
  const [avatar, setAvatar] = useState('')
  const coverHandler = (ava: string) => {
    setAvatar(ava)
  }
  const saveAvatarHandler = () => {
    const contentType = 'image/*'
    const blob = base64ToBlob(avatar ?? '', contentType)
    const formData = new FormData()

    formData.append('avatar', blob ?? '')
    upDateProfile(formData)
  }

  return (
    <div className={s.editProfile}>
      <InputTypeFile onClick={coverHandler} />
      <Button className={s.saveChangesButton} fullWidth onClick={saveAvatarHandler}>
        Save Changes
      </Button>
    </div>
  )
}

export type EditOffProps = {
  disabled: boolean
  email?: string
  logOut: () => void
  name?: string
  onClick: () => void
  onDelete: () => void
}

export const EditOff = ({ disabled, email, logOut, name, onClick, onDelete }: EditOffProps) => {
  const onClickEditModeHandler = () => {
    onClick()
  }

  return (
    <div className={s.editOffWrap}>
      <div className={s.editWrap}>
        <div className={s.editName}>
          <Typography variant={'h2'}>{name}</Typography>
          <IconButton
            disabled={disabled}
            iconId={'editOutline'}
            onClick={onClickEditModeHandler}
            variant={'secondary'}
          />
        </div>
        <Typography className={s.email} variant={'body2'}>
          {email}
        </Typography>
      </div>
      <IconButton
        className={s.logoutButton}
        iconId={'logout'}
        onClick={logOut}
        variant={'secondary'}
      >
        Logout
      </IconButton>
      <Button className={s.deleteButton} onClick={onDelete} variant={'primary'}>
        Delete account
      </Button>
    </div>
  )
}
