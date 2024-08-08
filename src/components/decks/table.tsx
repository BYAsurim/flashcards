import { NavLink } from 'react-router-dom'

import { Grade } from '@/components/decks/grade'
import { Table, TableBody, TableCell, TableRow } from '@/components/decks/table-elements'
import { Sort, TableHeadColumn, TableHeader } from '@/components/decks/table-header'
import { IconButton } from '@/components/ui'
import { DefaultValues } from '@/components/ui/modals/dialog/editDeckModal/editDeckModal'
import { User } from '@/services/auth'
import { Deck } from '@/services/decks/decks.types'

import s from '@/components/decks/table.module.scss'

import defaultImage from '../../assets/images/no-image.png'

type TableProps = {
  data?: User
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: ({ cover, id, isPrivate, name }: DefaultValues) => void
  setSort?: (sort: Sort) => void
  sort?: Sort
}

export const MainTable = (props: TableProps) => {
  const { data, decks, onDeleteClick, onEditClick, setSort, sort } = props
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
  const myId = data?.id
  const handleDeleteClick = (id: string) => () => {
    onDeleteClick?.(id)
  }

  const handleEditClick =
    ({ cover, id, isPrivate, name }: DefaultValues) =>
    () => {
      onEditClick?.({ cover, id, isPrivate, name })
    }

  // const handleDeckClick = (id: string) => {
  //   navigate('/decks/:deckId')
  // }

  return (
    <Table>
      <TableHeader columns={columns} setSort={setSort} sort={sort} />
      <TableBody>
        {decks?.map(deck => {
          const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <TableRow key={deck.id}>
              <TableCell>
                <NavLink className={s.imageButton} to={`/decks/${deck.id}`}>
                  <div className={s.imageWrap}>
                    <img alt={'img'} src={deck.cover ? deck.cover : defaultImage} />
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
                        onClick={handleEditClick({
                          cover: deck.cover,
                          id: deck.id,
                          isPrivate: deck.isPrivate,
                          name: deck.name,
                        })}
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
