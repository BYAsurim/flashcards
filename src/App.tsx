import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radioGroup'

export function App() {
  const options = [
    { label: 'hello', value: '1' },
    { label: '2', value: '2' },
  ]

  return (
    <div>
      <RadioGroup options={options} />
      <Button> click</Button>
    </div>
  )
}
