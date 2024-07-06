import type { Meta, StoryObj } from '@storybook/react'

import { MainTable } from '@/components/ui/table/table'
import { Table } from '@/components/ui/table/table-elements'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/UI/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTable: Story = {
  args: {
    children: (
      <>
        <MainTable />
      </>
    ),
  },
}
