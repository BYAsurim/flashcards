import type { Meta, StoryObj } from '@storybook/react'

import { ChangePassword } from '@/components/auth'

const meta = {
  component: ChangePassword,
  tags: ['autodocs'],
  title: 'Auth/ChangePassword',
} satisfies Meta<typeof ChangePassword>

export default meta
type Story = StoryObj<typeof meta>

export const ChangePasswordDefault: Story = {}
