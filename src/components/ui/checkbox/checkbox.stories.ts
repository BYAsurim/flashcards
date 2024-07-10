import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

const meta = {
  argTypes: {
    checked: {
      control: 'boolean',
      disabled: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    // label: {
    //   control: 'string',
    // },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
}

export const UnChecked: Story = {
  args: {
    checked: false,
    disabled: false,
  },
}

export const CheckedWithLable: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
}

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
export const DisabledWithLable: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Check-box',
  },
}
