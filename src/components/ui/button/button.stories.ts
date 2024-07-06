import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Typography',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Typography',
    disabled: false,
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Typography',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}
