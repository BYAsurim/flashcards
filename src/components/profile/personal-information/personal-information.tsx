import { useState } from 'react'

import { Button, Card, IconButton, TextField, Typography } from '@/components/ui'

import s from './personal-information.module.scss'

type Props = {
  avatar?: string
  email: string
  logOut?: () => void
  name: string
  onNameChange?: (newName: string) => void
}

export const PersonalInformation = (props: Props) => {
  const { avatar, email, logOut, name = 'DefaultName', onNameChange } = props
  const [editMode, setEditMode] = useState(false)
  // const [newName, setNewName] = useState(name)
  const editModeHandler = () => {
    setEditMode(!editMode)
  }
  const setNewNameHandler = (value: string) => {
    onNameChange?.(value)
    // setNewName(value)
    setEditMode(false)
  }

  const logOutHandler = () => {
    logOut?.()
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Personal information
      </Typography>
      <div className={s.avatarWrap}>
        <img alt={'avatar'} src={avatar} />
        <IconButton iconId={'editOutline'} variant={'secondary'} />
      </div>
      {editMode && <EditOn name={name} onClick={setNewNameHandler} />}
      {!editMode && (
        <EditOff email={email} logOut={logOutHandler} name={name} onClick={editModeHandler} />
      )}
    </Card>
  )
}

export type EditOnProps = {
  name: string
  onClick: (value: string) => void
}

export const EditOn = (props: EditOnProps) => {
  const [newName, setNewName] = useState('')
  const onChangeHandler = (value: string) => {
    setNewName(value)
  }
  const onClickHandler = () => {
    props.onClick?.(newName)
  }

  return (
    <div className={s.editProfile}>
      <TextField
        className={s.field}
        defaultValue={props.name}
        label={'Nickname'}
        onValueChange={onChangeHandler}
        placeholder={props.name}
      />
      <Button className={s.saveChangesButton} fullWidth onClick={onClickHandler}>
        Save Changes
      </Button>
    </div>
  )
}

export type EditOffProps = {
  email: string
  logOut: () => void
  name: string
  onClick: () => void
}

export const EditOff = ({ email, logOut, name, onClick }: EditOffProps) => {
  const onClickEditModeHandler = () => {
    onClick()
  }

  const onLogoutHandler = () => {
    logOut()
  }

  return (
    <div className={s.editOffWrap}>
      <div className={s.editWrap}>
        <div className={s.editName}>
          <Typography variant={'h2'}>{name}</Typography>
          <IconButton
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
        onClick={onLogoutHandler}
        variant={'secondary'}
      >
        Logout
      </IconButton>
    </div>
  )
}
