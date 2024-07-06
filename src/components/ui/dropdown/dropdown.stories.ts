import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from './dropdown'

// @ts-ignore
const meta = {
  argTypes: {
    variant: {
      control: 'radio',
    },
  },
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/UI/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownProfileInfo: Story = {}
