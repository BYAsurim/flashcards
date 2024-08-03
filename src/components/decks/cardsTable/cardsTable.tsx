import { CardsInADeckResponse } from '@/services/decks/decks.types'

import s from './cardsTable.module.scss'

import { Grade } from '../grade'
import { Table, TableBody, TableCell, TableRow } from '../table-elements'
import { TableHeadColumn, TableHeader } from '../table-header'
type Props = {
  cards?: CardsInADeckResponse
}

export const CardsTable = ({ cards }: Props) => {
  const columns: TableHeadColumn[] = [
    { key: 'question', sortable: true, title: 'Question' },
    { key: 'answer', sortable: true, title: 'Answer' },
    { key: 'updated', sortable: true, title: 'Last updated' },
    { key: 'grade', sortable: true, title: 'Grade' },
  ]
  const cardsForRender = cards?.items

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {cardsForRender &&
          cardsForRender?.map(card => {
            const updatedAt = new Date(card.updated).toLocaleDateString('ru-RU')

            return (
              <TableRow key={card.id}>
                <TableCell>
                  <div className={s.flexCell}>
                    {card.question}
                    {card.questionImg && (
                      <img
                        alt={'question image'}
                        className={s.questionImg}
                        src={card.questionImg}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={s.flexCell}>
                    {card.answer}
                    {card.answerImg && (
                      <img alt={'answer image'} className={s.answerImg} src={card.answerImg} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{updatedAt}</TableCell>
                <TableCell>
                  <Grade grade={card.grade} />
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
