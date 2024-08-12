import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { CardsTable } from '@/components/decks'
import { Button, Icon, TextField, Typography } from '@/components/ui'
import { CreateCardModal } from '@/components/ui/modals/dialog/createCardModal/createCardModal'
import { Page } from '@/components/ui/page'
import { useGetMeQuery } from '@/services/auth'
import { useCardsInADeckQuery, useDeckByIdQuery } from '@/services/decks/decksApi'

import s from './deckPage.module.scss'

export const DeckPage = () => {
  const { deckId } = useParams()
  const { data: user } = useGetMeQuery()
  const myId = user?.id
  const { data: deck } = useDeckByIdQuery({ id: deckId || '' })
  const { data: cards, isLoading: cardLoading } = useCardsInADeckQuery({ id: deckId || '' })
  const [openCreateCardModal, setOpenCreateCardModal] = useState(false)

  if (cardLoading) {
    return <div>...Loading</div>
  }

  // Добавить пагинацию, если много карт в колоде
  return (
    <Page className={s.page}>
      <NavLink className={s.navLink} to={'/'}>
        <Typography variant={'body1'}>
          <Icon height={'16'} iconId={'back'} viewBox={'0 -3 24 24'} width={'16'} />
          Back to Decks List
        </Typography>
      </NavLink>
      <div className={s.header}>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        {deck?.userId !== myId && !!cards?.items.length && (
          <Button>{deck?.userId === myId ? 'Add new Card' : ' Learn to Deck'}</Button>
        )}
      </div>
      {deck?.cover && <img alt={'deckCover'} className={s.deckCover} src={deck?.cover} />}
      {cards?.items.length ? (
        <>
          <TextField type={'search'} />
          <CardsTable cards={cards} />
        </>
      ) : (
        <div className={s.description}>
          <Typography variant={'body1'}>
            {deck?.userId === myId
              ? 'This deck is empty. Click add new card to fill this deck.'
              : 'This deck is empty. '}
          </Typography>
          {deck?.userId === myId && (
            <Button onClick={() => setOpenCreateCardModal(true)}>Add new Card</Button>
          )}
          {openCreateCardModal && (
            <CreateCardModal
              onOpenChange={() => setOpenCreateCardModal(!openCreateCardModal)}
              open={openCreateCardModal}
            />
          )}
        </div>
      )}
    </Page>
  )
}
