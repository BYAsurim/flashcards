import type { Meta, StoryObj } from '@storybook/react'

import { DeckPage } from '@/pages/deckPage/deckPage'

const meta = {
  component: DeckPage,
  tags: ['autodocs'],
  title: 'Components/UI/DeckPage',
} satisfies Meta<typeof DeckPage>

export default meta
type Story = StoryObj<typeof meta>

export const DeckPageDefault: Story = {
  render: () => <DeckPage />,
}
