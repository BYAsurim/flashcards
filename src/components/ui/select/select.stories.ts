import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    options: [
      { disabled: true, text: 1, value: 1 },
      { text: 2, value: 2 },
    ],
    placeholder: 'YO',
  },
}
