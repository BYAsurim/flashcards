import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationPrimary: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onPageChange: (page: number) => page,
    onPerPageChange: (itemsPerPage: number) => itemsPerPage,
    perPageOptions: [10, 20, 30, 50],
    siblings: 1,
    totalPageCount: 10,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)

    return (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={items => setItemsPerPage(items)}
        perPageOptions={[10, 20, 30, 50]}
        siblings={args.siblings}
        totalPageCount={args.totalPageCount}
      />
    )
  },
}
