import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button, IconButton, Select, TextField, Typography } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modals/Modal'

import s from './Modal.module.scss'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/UI/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalDefault: Story = {
  args: {
    children: 'Modal',
    onOpenChange: () => {},
    open: true,
    title: 'Modal title',
  },
  render: (args): any => {
    const [open, setOpen] = useState(false)

    return (
      <Modal {...args} onOpenChange={setOpen} open={open}>
        <Select
          label={'Select'}
          name={'Select'}
          options={[
            { label: 'Minsk', value: 'Minsk' },
            { label: 'Brest', value: 'Brest' },
            { label: 'Grodno', value: 'Grodno' },
          ]}
          placeholder={'Select-box'}
        />
        <TextField label={'Input'} placeholder={'Input'} />
        <TextField label={'Input'} placeholder={'Input'} />
        <Checkbox checked label={'Check-box'} />
        <div className={s.footer}>
          <Button type={'button'} variant={'secondary'}>
            Cansel
          </Button>
          <Button type={'button'}>Save changes</Button>
        </div>
      </Modal>
    )
  },
}

export const DeleteDeckModalStory: Story = {
  args: {
    children: 'Modal',
    onOpenChange: () => {},
    open: true,
    title: 'Confirm Action',
  },
  render: (args): any => {
    const [open, setOpen] = useState(false)

    return (
      <Modal onOpenChange={() => setOpen(!open)} open={open} title={args.title}>
        <Typography variant={'body2'}>
          Do you really want to remove the deck? All cards will be deleted.
        </Typography>
        <div className={s.footer}>
          <Button onClick={() => setOpen(!open)} type={'button'} variant={'secondary'}>
            Cansel
          </Button>
          <Button type={'button'}>Confirm</Button>
        </div>
      </Modal>
    )
  },
}

export const CreateDeckModalDefault: Story = {
  args: {
    children: 'CreateDeckModal',
    onOpenChange: () => {},
    open: true,
    title: 'Creating a New Deck',
  },
  render: (args): any => {
    const [open, setOpen] = useState(false)

    return (
      <Modal onOpenChange={() => setOpen(!open)} open={open} title={args.title}>
        <IconButton
          fullWidth
          height={'16'}
          iconId={'imageIcon'}
          variant={'secondary'}
          viewBox={'0 0 24 24'}
          width={'16'}
        >
          Upload Image
        </IconButton>
        <TextField label={'Name Deck'} />
        <Checkbox checked={false} label={'Private Deck'} />

        <div className={s.footer}>
          <Button onClick={() => setOpen(!open)} type={'button'} variant={'secondary'}>
            Cansel
          </Button>
          <Button type={'button'}>Confirm</Button>
        </div>
      </Modal>
    )
  },
}
