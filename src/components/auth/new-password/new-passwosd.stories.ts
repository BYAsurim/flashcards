import type { Meta, StoryObj } from '@storybook/react'

import { NewPassword } from '@/components/auth/new-password/new-password'

const meta = {
  component: NewPassword,
  tags: ['autodocs'],
  title: 'Auth/NewPassword',
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const NewPasswordDefault: Story = {}
