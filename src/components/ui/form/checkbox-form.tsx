import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type Props<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'disabled' | 'name' | 'onBlur' | 'onCheckedChange' | 'ref'
> &
  UseControllerProps<T>

const CheckboxForm = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, defaultValue, disabled, name, rules, shouldUnregister })

  return (
    <Checkbox
      {...checkboxProps}
      checked={value}
      label={'remember me'}
      onCheckedChange={onChange}
      {...field}
    />
  )
}

export default CheckboxForm
