import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/ui/header/header'
import { RadioGroup } from '@/components/ui/radioGroup'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

export function App() {
  const options = [
    { label: 'hello', value: '1' },
    { label: '2', value: '2' },
  ]
  const [sliderValue, setSliderValue] = useState([10, 90])
  const tabs = [
    { title: 'My decks', value: 'my' },
    { title: 'All decks', value: 'all' },
    { title: 'Favorites', value: 'favorites' },
  ]

  return (
    <div>
      <Header />
      <Card>
        <Avatar />
        <TextField type={'password'} />
        <TextField type={'search'} />
        <Typography variant={'h2'}>
          <Button variant={'secondary'}> click</Button>
        </Typography>
        <RadioGroup options={options} />
        <div style={{ margin: '40px' }}>
          <Select
            options={[
              { disabled: true, text: 1, value: 1 },
              { text: 2, value: 2 },
            ]}
            placeholder={'yo'}
          />
        </div>
        <Slider max={100} onValueChange={setSliderValue} value={sliderValue} />
      </Card>
      <Tabs label={'Yohohoho'} tabs={tabs}></Tabs>
    </div>
  )
}
