import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header/header'
import { RadioGroup } from '@/components/ui/radioGroup'

export function App() {
  const options = [
    { label: 'hello', value: '1' },
    { label: '2', value: '2' },
  ]

  return (
    <div>
      <Header />
      <RadioGroup options={options} />
      <Button> click</Button>
    </div>
  )
}
