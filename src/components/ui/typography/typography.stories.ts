import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'body1',
        'body2',
        'link1',
        'link2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/UI/Typography',
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

const testText = 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH\n'

export const H1: Story = {
  args: {
    as: 'h1',
    children: `${testText}`,
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: `${testText}`,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: `${testText}`,
    variant: 'h3',
  },
}

export const H4: Story = {
  args: {
    as: 'h4',
    children: `${testText}`,
    variant: 'h4',
  },
}
export const Body1: Story = {
  args: {
    children: `${testText}`,
    variant: 'body1',
  },
}
export const Body2: Story = {
  args: {
    children: `${testText}`,
    variant: 'body2',
  },
}
export const Link1: Story = {
  args: {
    as: 'a',
    children: `${testText}`,
    href: '/https://www.google.com',
    variant: 'link1',
  },
}
export const Link2: Story = {
  args: {
    as: 'a',
    children: `${testText}`,
    href: '/https://www.google.com',
    variant: 'link2',
  },
}
export const Subtitle1: Story = {
  args: {
    children: `${testText}`,
    variant: 'subtitle1',
  },
}

export const Subtitle2: Story = {
  args: {
    children: `${testText}`,
    variant: 'subtitle2',
  },
}

export const Overline: Story = {
  args: {
    children: `${testText}`,
    variant: 'overline',
  },
}

export const Caption: Story = {
  args: {
    children: `${testText}`,
    variant: 'caption',
  },
}
