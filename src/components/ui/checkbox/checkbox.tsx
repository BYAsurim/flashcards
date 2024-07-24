import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
}
export const Checkbox = ({
  checked,
  className,
  disabled,
  id,
  label,
  name,
  onCheckedChange,
}: CheckboxProps) => {
  const classNames = `${s.checkboxContainer} ${className}`

  return (
    <div className={classNames}>
      <RadixCheckbox.Root
        checked={checked}
        className={s.checkBox}
        disabled={disabled}
        id={id}
        name={name}
        onCheckedChange={onCheckedChange}
      >
        <RadixCheckbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon height={'18'} viewBox={'-1 -1 18 18'} width={'18'} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className={s.label} htmlFor={'c1'}>
          {label}
        </label>
      )}
    </div>
  )
}
