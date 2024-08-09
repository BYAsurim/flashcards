import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Button, Card, Icon, Page, RadioGroup, Typography } from '@/components/ui'
import { useDeckByIdQuery, useGradeOfCardMutation, useRandomCardQuery } from '@/services/decks'

import s from '@/pages/deckPage/deckPage.module.scss'

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
      <Card>
        <Typography variant={'h2'}>{deck?.name}</Typography>
        <Typography>Question: {card?.question}</Typography>
        {card?.questionImg && (
          <img
            alt={'question Image'}
            src={card.questionImg}
            style={{ height: '30px', width: '30px' }}
          />
        )}
        <Typography>Number of attempts: {card?.shots}</Typography>
        {openRate && card?.answerImg && (
          <img
            alt={'answer Image'}
            src={card.answerImg}
            style={{ height: '30px', width: '30px' }}
          />
        )}
        {openRate && (
          <div>
            <Typography>Answer: {card?.answer}</Typography>
            <RadioGroup onValueChange={setGrade} options={rateRadioGroup} />
          </div>
        )}
        {!openRate && (
          <Button fullWidth onClick={() => setOpenRate(true)}>
            Show answer
          </Button>
        )}
        {openRate && (
          <Button fullWidth onClick={rateHandler}>
            Next question
          </Button>
        )}
      </Card>
    </Page>
  )
}
