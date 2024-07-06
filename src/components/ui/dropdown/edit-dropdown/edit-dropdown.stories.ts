import type { Meta, StoryObj } from '@storybook/react'

import { EditDropdown } from '@/components/ui/dropdown/edit-dropdown/edit-dropdown'

// @ts-ignore
const meta = {
  argTypes: {
    variant: {
      control: 'radio',
    },
  },
  component: EditDropdown,
  tags: ['autodocs'],
  title: 'Components/UI/EditDropdown',
} satisfies Meta<typeof EditDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownProfileInfo: Story = {}
