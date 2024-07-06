import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import defaultAvatar from '@/assets/images/default-avatar.jpg'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

export type AvatarProps = {
  size?: CSSProperties['width']
  userImg?: string
} & ComponentPropsWithoutRef<'img'>

export const Avatar = ({ className, size = '36px', style, userImg, ...rest }: AvatarProps) => {
  return (
    <div className={s.wrap}>
      <img
        className={clsx(className, s.avatar)}
        src={userImg ? userImg : defaultAvatar}
        style={{
          ...style,
          height: size,
          width: size,
        }}
        {...rest}
      />
    </div>
  )
}
