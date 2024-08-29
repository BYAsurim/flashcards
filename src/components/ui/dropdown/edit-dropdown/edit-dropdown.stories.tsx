import type { Meta, StoryObj } from '@storybook/react'

import { EditDropdown } from '@/components/ui/dropdown/edit-dropdown/edit-dropdown'

// @ts-ignore
const meta = {
  argTypes: {},
  component: EditDropdown,
  tags: ['autodocs'],
  title: 'Components/UI/EditDropdown',
} satisfies Meta<typeof EditDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownProfileInfo: Story = {
  args: {
    deck: {
      author: {
        id: '',
        name: '',
      },
      cardsCount: 2,
      cover: '',
      created: '5.13.1235',
      id: 'string',
      isPrivate: false,
      name: 'Name!',
      updated: '10.05.1635',
      userId: '15.10.1246',
    },
    deleteDeckOpen: () => true,
    editDeckOpen: () => true,
  },
}
