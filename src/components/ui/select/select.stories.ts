import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
    placeholder: 'YO',
  },
}
