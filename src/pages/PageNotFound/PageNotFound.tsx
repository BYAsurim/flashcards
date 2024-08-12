import { Link } from 'react-router-dom'

import { Button, Page, Typography } from '@/components/ui'

import img from '../../assets/images/404.svg'

export const PageNotFound = () => {
  return (
    <Page>
      <img alt={'404'} src={img} />
      <Typography>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'}>
        Back to home page
      </Button>
    </Page>
  )
}
