import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'tab1',
    label: 'title',
    tabs: [
      { title: 'SignIn', value: 'tab1' },
      { title: 'Register', value: 'tab2' },
      { title: 'Contact', value: 'tab3' },
    ],
  },
}

export const Vertical: Story = {
  args: {
    defaultValue: 'tab1',
    orientation: 'vertical',
    tabs: [
      { title: 'SignIn', value: 'tab1' },
      { title: 'Register', value: 'tab2' },
      { title: 'Contact', value: 'tab3' },
    ],
  },
}

export const DesabledTab: Story = {
  args: {
    defaultValue: 'tab1',
    label: 'title',
    tabs: [
      { title: 'SignIn', value: 'tab1' },
      { title: 'Register', value: 'tab2' },
      { disabled: true, title: 'Contact', value: 'tab3' },
    ],
  },
}
