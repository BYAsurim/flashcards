import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from '@/components/profile'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Profile/PersonalInformation',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatar: 'https://i.pinimg.com/564x/92/c1/19/92c1196ef215f62c5b81a991aeeda2bb.jpg',
    email: 'itsnotrealemail@mail.com',
    name: 'Witch',
  },
}
