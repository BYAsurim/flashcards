import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  ariaLabel?: string
  className?: string
  onChange?: () => void
  options: Option[]
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  (
    { ariaLabel, className, defaultValue, disabled, name, onChange, options, value, ...rest },
    ref
  ) => {
    return (
      <>
        <RadixRadioGroup.Root
          aria-label={ariaLabel}
          className={`${s.radioGroupRoot} ${className}`}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onValueChange={onChange}
          ref={ref}
          value={value}
          {...rest}
        >
          {options.map(option => {
            return (
              <div key={option.value} style={{ alignItems: 'center', display: 'flex' }}>
                <RadixRadioGroup.Item
                  className={s.radioGroupItem}
                  id={option.value}
                  value={option.value}
                >
                  <RadixRadioGroup.Indicator
                    className={`${s.radioGroupIndicator} ${disabled && s.disabledIndicator}`}
                  />
                </RadixRadioGroup.Item>
                <label
                  className={`${s.label} ${disabled && s.disabledLabel}`}
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </RadixRadioGroup.Root>
      </>
    )
  }
)
