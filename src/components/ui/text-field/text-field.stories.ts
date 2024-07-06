import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/UI/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: true,
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    label: 'Label',
    placeholder: 'Password',
    type: 'password',
  },
}

export const Error: Story = {
  args: {
    errorMessage: 'Error message',
    label: 'Input with error',
    value: 'Wrong value',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    label: 'Input with search',
    placeholder: 'Input with search',
    type: 'search',
  },
}
