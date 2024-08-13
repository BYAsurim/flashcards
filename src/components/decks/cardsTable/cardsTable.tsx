import { IconButton } from '@/components/ui'
import { CardsInADeckResponse } from '@/services/decks/decks.types'

import sFromTable from '../../decks/table.module.scss'
import s from './cardsTable.module.scss'

import { Grade } from '../grade'
import { Table, TableBody, TableCell, TableRow } from '../table-elements'
import { TableHeadColumn, TableHeader } from '../table-header'

type Props = {
  cards?: CardsInADeckResponse
  myId?: string
  onDeleteCard: (value: boolean) => void
}

export const CardsTable = ({ cards, myId, onDeleteCard }: Props) => {
  const columns: TableHeadColumn[] = [
    { key: 'question', sortable: true, title: 'Question' },
    { key: 'answer', sortable: true, title: 'Answer' },
    { key: 'updated', sortable: true, title: 'Last updated' },
    { key: 'grade', sortable: true, title: 'Grade' },
    { key: 'buttons', sortable: true, title: '' },
  ]
  const cardsForRender = cards?.items

  const updateCardHandler = () => {}
  const deleteCardHandler = (id: string) => {
    onDeleteCard(true)
  }

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
                <TableCell>
                  {card.userId === myId && (
                    <div className={sFromTable.editIcons}>
                      <IconButton
                        className={sFromTable.tableEditButton}
                        height={'16'}
                        iconId={'editOutline'}
                        onClick={updateCardHandler}
                        viewBox={'0 0 18 18'}
                        width={'16'}
                      />
                      <IconButton
                        className={sFromTable.tableEditButton}
                        height={'16'}
                        iconId={'trash'}
                        onClick={() => deleteCardHandler(card.id)}
                        viewBox={'0 0 18 18'}
                        width={'16'}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
