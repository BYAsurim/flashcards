import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Select, TextField } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { Modal } from '@/components/ui/modal/Modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/UI/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
      </Modal>
    )
  },
}
