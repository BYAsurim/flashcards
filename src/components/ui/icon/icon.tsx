import React from 'react'

import iconsSprite from '@/assets/svg/sprite.svg'

export type IconPropsType = {
  className?: string
  fill?: string
  height?: string
  iconId: string
  viewBox?: string
  width?: string
}
export const Icon: React.FC<IconPropsType> = (props: IconPropsType) => {
  const { className, fill = 'none', height, iconId, viewBox, width } = props

  return (
    <svg
      className={className}
      fill={fill}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      width={width || '24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${iconsSprite}#${iconId}`} />
    </svg>
  )
}
