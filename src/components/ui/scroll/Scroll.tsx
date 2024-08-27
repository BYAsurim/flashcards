import React, { CSSProperties, ReactNode } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import s from './scroll.module.scss'

type ScrollProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const Scroll: React.FC<ScrollProps> = ({ children, className, style }) => (
  <ScrollArea.Root className={`${s.ScrollAreaRoot} ${className}`}>
    <ScrollArea.Viewport className={s.ScrollAreaViewport}>{children}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar className={s.ScrollAreaScrollbar} forceMount orientation={'vertical'}>
      <ScrollArea.Thumb className={s.ScrollAreaThumb} style={style} />
      <ScrollArea.Corner className={s.ScrollAreaCorner} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
)
