import { NavLink } from 'react-router-dom'

import { IconButton } from '@/components/ui'
import { Grade } from '@/components/ui/table/grade'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table/table-elements'
import { TableHeadColumn, TableHeader } from '@/components/ui/table/table-header'
import { Deck } from '@/services/decks/decks.types'

import s from '@/components/ui/table/table.module.scss'

import defaultImage from '../../../assets/images/default-avatar.jpg'

type TableProps = {
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
}

export const MainTable = (props: TableProps) => {
  const { decks, onDeleteClick, onEditClick } = props
  const columns: Array<TableHeadColumn> = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'author.name',
      title: 'Created by',
    },
    {
      key: 'grades',
      title: 'grades',
    },
    {
      key: 'edit',
      sortable: false,
      title: '',
    },
  ]
  const myId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const handleDeleteClick = (id: string) => () => {
    onDeleteClick?.(id)
  }

  const handleEditClick = (id: string) => () => {
    onEditClick?.(id)
  }

  // const handleDeckClick = (id: string) => {
  //   navigate('/decks/:deckId')
  // }

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {decks?.map(deck => {
          const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <TableRow key={deck.id}>
              <TableCell>
                <NavLink className={s.imageButton} to={`/decks/${deck.id}`}>
                  <div className={s.imageWrap}>
                    <img src={deck.cover ? deck.cover : defaultImage} />
                  </div>
                  {deck.name}
                  {/*<Button as={'a'} className={s.imageButton} href={'#'}>*/}
                  {/*  <div className={s.imageWrap}>*/}
                  {/*    <img src={deck.cover ? deck.cover : defaultImage} />*/}
                  {/*  </div>*/}
                  {/*  {deck.name}*/}
                  {/*</Button>*/}
                </NavLink>
              </TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{updatedAt}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell>
                <Grade />
              </TableCell>
              <TableCell>
                <div className={s.editIcons}>
                  <IconButton
                    className={s.tableEditButton}
                    height={'16'}
                    iconId={'play'}
                    viewBox={'0 0 18 18'}
                    width={'16'}
                  />
                  {deck.userId === myId && (
                    <>
                      <IconButton
                        className={s.tableEditButton}
                        disabled={deck.userId !== myId}
                        height={'16'}
                        iconId={'editOutline'}
                        onClick={handleEditClick(deck.id)}
                        viewBox={'0 0 18 18'}
                        width={'16'}
                      />
                      <IconButton
                        className={s.tableEditButton}
                        disabled={deck.userId !== myId}
                        height={'16'}
                        iconId={'trash'}
                        onClick={handleDeleteClick(deck.id)}
                        viewBox={'0 0 18 18'}
                        width={'16'}
                      />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
