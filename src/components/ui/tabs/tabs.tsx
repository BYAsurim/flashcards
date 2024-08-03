import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

export type Tab = {
  disabled?: boolean
  title: string
  value: string
}

type TabsProps = {
  className?: string
  currentTab?: string
  defaultValue?: string
  label?: string
  orientation?: 'horizontal' | 'vertical'
  tabs: Tab[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = ({
  children,
  className,
  currentTab,
  defaultValue,
  label,
  orientation = 'horizontal',
  tabs,
  ...rest
}: TabsProps) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <RadixTabs.Root
        className={s.root}
        defaultValue={defaultValue}
        orientation={orientation}
        {...rest}
      >
        <RadixTabs.List className={s.tabsList}>
          {tabs.map(tab => (
            <RadixTabs.Trigger
              className={clsx(s.tabTrigger, className)}
              disabled={tab.disabled}
              key={tab.value}
              value={tab.value}
            >
              {tab.title}
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
      </RadixTabs.Root>
    </div>
  )
}

export type TabContentProps = {
  children: ReactNode
  value: string
}

export const TabContent = ({ children, value }: TabContentProps) => {
  return (
    <RadixTabs.Content className={s.content} value={value}>
      {children}
    </RadixTabs.Content>
  )
}
