import { Link } from 'react-router-dom'

import { Button, Page, Typography } from '@/components/ui'

import s from './pageNotFound.module.scss'

import img from '../../assets/images/404.svg'

export const PageNotFound = () => {
  return (
    <Page className={s.wrapper}>
      <img alt={'404'} className={s.img} src={img} />
      <Typography>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'}>
        Back to home page
      </Button>
    </Page>
  )
}
