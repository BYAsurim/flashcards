import type { Meta, StoryObj } from '@storybook/react'

import { MainTable } from '@/components/decks/table'
import { Table } from '@/components/decks/table-elements'
import { Deck } from '@/services/decks/decks.types'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Deck/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTable: Story = {
  args: {
    children: 'MainTable',
  },
  render: (args): any => {
    const deck: Deck[] = [
      {
        author: { id: '145454', name: 'Nuki' },
        cardsCount: 2,
        cover: 'https://i.pinimg.com/564x/c8/60/9d/c8609d48d7793d52bf2cf9fa55c9342f.jpg',
        created: '20.05.1993',
        id: '453534',
        isPrivate: true,
        name: 'Nana 👩‍🦰💕🍓🐶',
        updated: '15.04.2003',
        userId: '5752',
      },
      {
        author: { id: '145454', name: 'Nuki' },
        cardsCount: 3,
        cover: 'https://i.pinimg.com/564x/77/a7/17/77a717c1fefe3e1e89fcad39917aa311.jpg',
        created: '20.05.1993',
        id: '453534',
        isPrivate: true,
        name: 'Skeleton 🍓',
        updated: '15.04.2003',
        userId: '5752',
      },
      {
        author: { id: '145454', name: 'Vlad' },
        cardsCount: 666,
        cover: 'https://i.pinimg.com/736x/4b/40/07/4b4007cd3102e89a8e754811a36d921d.jpg',
        created: '20.05.1993',
        id: '453534',
        isPrivate: true,
        name: 'Vampire 🩸🩸🩸',
        updated: '15.04.2003',
        userId: '5752',
      },
    ]

    return <MainTable {...args} decks={deck} />
  },
}
