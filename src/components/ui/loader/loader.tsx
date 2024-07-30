import React from 'react'

import * as Progress from '@radix-ui/react-progress'

import s from './loader.module.scss'

export const Loader = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Progress.Root className={s.ProgressRoot}>
      {/*value(progress)для определенного индикатора*/}
      <Progress.Indicator
        className={s.ProgressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}
