import React, { ElementRef, ReactNode, forwardRef } from 'react'

import { ChevronDownIcon } from '@/assets/icons/ChevronDownIcon'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './select.module.scss'

type Option =
  | { disabled?: boolean; text: number; value: number }
  | { disabled?: boolean; text: number; value: string }
  | { disabled?: boolean; text: string; value: number }
  | { disabled?: boolean; text: string; value: string }

type SelectProps = {
  children?: React.ReactNode
  className?: string
  label?: string
  options?: Option[]
  placeholder?: string
  variant?: 'default' | 'pagination'
} & SelectPrimitive.SelectProps

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Root>, SelectProps>(
  ({ children, className, defaultValue, label, options, placeholder, variant, ...rest }, ref) => {
    return (
      <>
        {variant !== 'pagination' && label && <label className={s.label}>{label}</label>}
        <SelectPrimitive.Root defaultValue={defaultValue} {...rest}>
          <SelectPrimitive.Trigger className={s.selectTrigger} ref={ref}>
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon className={s.icon}>
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content className={s.selectContent}>
            {options?.map(el => {
              return (
                <SelectItem key={el.value} value={String(el.value)}>
                  {el.text}
                </SelectItem>
              )
            })}
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </>
    )
  }
)

type SelectItemProps = {
  children?: ReactNode
  disabled?: boolean
  value: string
}

const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <SelectPrimitive.Item className={s.selectItem} {...props} ref={ref}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)
