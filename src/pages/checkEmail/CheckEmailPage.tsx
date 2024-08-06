import { useLocation } from 'react-router-dom'

import { CheckEmail } from '@/components/auth'
import { Page } from '@/components/ui'

export const CheckEmailPage = () => {
  const {
    state: { email },
  } = useLocation()

  return (
    <Page>
      <CheckEmail email={email} />
    </Page>
  )
}
