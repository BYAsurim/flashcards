import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Button, Card, Icon, Page, RadioGroup, Typography } from '@/components/ui'
import { useDeckByIdQuery, useGradeOfCardMutation, useRandomCardQuery } from '@/services/decks'

import s from '@/pages/learnCardPage/learnCardPage.module.scss'

export const LearnCardPage = () => {
  const { id } = useParams()
  const { data: deck } = useDeckByIdQuery({ id: id || '' })
  const { data: card } = useRandomCardQuery({ id: id || '' })
  const [openRate, setOpenRate] = useState(false)
  const [grade, setGrade] = useState('1')
  const [gradeCard] = useGradeOfCardMutation()

  const rateRadioGroup = [
    {
      label: 'Did not know',
      value: '1',
    },
    {
      label: 'Forgot',
      value: '2',
    },
    {
      label: 'A lot of thought',
      value: '3',
    },
    {
      label: 'Confused',
      value: '4',
    },
    {
      label: 'Knew the answer',
      value: '5',
    },
  ]

  const rateHandler = async () => {
    const newGrade = Number(grade)

    try {
      if (card?.id) {
        await gradeCard({ cardId: card?.id, grade: newGrade })
      }
    } catch (e: any) {
      alert('card error')
    }
  }

  return (
    <Page>
      <NavLink className={s.navLink} to={'/'}>
        <Typography variant={'body1'}>
          <Icon height={'16'} iconId={'back'} viewBox={'0 -3 24 24'} width={'16'} />
          Back to Decks List
        </Typography>
      </NavLink>
      <Card className={s.card}>
        <Typography className={s.deckName} variant={'h1'}>
          {deck?.name}
        </Typography>
        <div className={s.questionBlock}>
          <Typography className={s.question} variant={'body1'}>
            <span>Question:</span> {card?.question}
          </Typography>
          {card?.questionImg && (
            <img alt={'question Image'} className={s.questionImg} src={card.questionImg} />
          )}
          <Typography className={s.shot} variant={'body2'}>
            Number of attempts: {card?.shots}
          </Typography>
        </div>

        {openRate && (
          <div className={s.answerBlock}>
            <Typography className={s.answer} variant={'body1'}>
              <span>Answer:</span> {card?.answer}
            </Typography>
            {openRate && card?.answerImg && (
              <img alt={'answer Image'} className={s.answerImg} src={card.answerImg} />
            )}
            <Typography className={s.rate} variant={'body1'}>
              Rate yourself:
            </Typography>
            <RadioGroup
              className={s.radioGroup}
              defaultValue={'1'}
              onValueChange={setGrade}
              options={rateRadioGroup}
            />
          </div>
        )}
        {!openRate && (
          <Button className={s.button} fullWidth onClick={() => setOpenRate(true)}>
            Show answer
          </Button>
        )}
        {openRate && (
          <Button className={s.button} fullWidth onClick={rateHandler}>
            Next question
          </Button>
        )}
      </Card>
    </Page>
  )
}
