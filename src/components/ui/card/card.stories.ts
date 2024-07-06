import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/UI/Card',
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const CardDiv: Story = {
  args: {
    variant: 'primary',
  },
}
export const CardSection: Story = {
  args: {
    as: 'section',
    variant: 'primary',
  },
}
export const CardArticle: Story = {
  args: {
    as: 'article',
    variant: 'primary',
  },
}
export const CardAside: Story = {
  args: {
    as: 'aside',
    variant: 'primary',
  },
}
