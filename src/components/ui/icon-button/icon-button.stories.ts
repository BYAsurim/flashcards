import type { Meta, StoryObj } from '@storybook/react'

import { IconButton } from '@/components/ui/icon-button/icon-button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: IconButton,
  tags: ['autodocs'],
  title: 'Components/UI/IconButton',
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Typography',
    disabled: false,
    iconId: 'editOutline',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Typography',
    disabled: false,
    iconId: 'editOutline',
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Typography',
    disabled: false,
    fullWidth: true,
    iconId: 'editOutline',
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    iconId: 'editOutline',
    variant: 'primary',
  },
}
