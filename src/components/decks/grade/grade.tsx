import { Icon } from '@/components/ui'

import s from './grade.module.scss'
type GradeProps = {
  className?: string
  grade?: number
}
export const Grade = (props: GradeProps) => {
  const { grade = 3 } = props
  const array = Array.from({ length: 5 }, (_, i) => i < grade)

  return (
    <div className={s.grade}>
      {array.map((star, index) => {
        return (
          <Icon height={'18'} iconId={star ? 'star' : 'star-outline'} key={index} width={'18'} />
        )
      })}
    </div>
  )
}
