import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CardsTable } from '@/components/decks'
import { Button, Icon, Pagination, TextField, Typography } from '@/components/ui'
import { EditDropdown } from '@/components/ui/dropdown/edit-dropdown'
import { LoadingBar } from '@/components/ui/loader/loading-bar'
import { CreateCardModal } from '@/components/ui/modals/dialog/createCardModal/createCardModal'
import { DeleteDeck } from '@/components/ui/modals/dialog/deleteDeckDialog/deleteDeck'
import { Page } from '@/components/ui/page'
import { useGetMeQuery } from '@/services/auth'
import { useDeleteCardByIdMutation } from '@/services/cards/cardsApi'
import { UseCardsParams } from '@/services/cards/useCardsParams'
import { CardsInADeckItem } from '@/services/decks/decks.types'

import s from './deckPage.module.scss'

export const DeckPage = () => {
  const { data: user } = useGetMeQuery()
  const myId = user?.id
  const {
    cards,
    cardsError,
    // cardsSearchParams,
    currentPageHandler,
    deck,
    // deckError,
    isLoadingCards: cardsLoading,
    // isLoadingDeck,
    // isMy,
    // onClearClick,
    pageSizeHandler,
    // searchChangeHandle,
    setSort,
    sort,
  } = UseCardsParams()
  const [deleteCard] = useDeleteCardByIdMutation()
  const [selectedCardId, setSelectedCardId] = useState<string>('')
  const [openCreateCardModal, setOpenCreateCardModal] = useState(false)
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false)
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const [defaultCardValue, setDefaultCardValue] = useState<CardsInADeckItem>()
  // const { data: card, isLoading: cardLoading } = useGetCardByIdQuery({ id: selectedCardId })

  const handleDeleteCard = (cardId: string) => {
    setSelectedCardId(cardId)
    setOpenDeleteCardModal(true)
  }
  const handleEditCard = (card: CardsInADeckItem) => {
    setSelectedCardId(prevCardId => {
      // Используем колбэк в setState, чтобы гарантировать актуальное значение cardId
      if (prevCardId !== card?.id) {
        setDefaultCardValue(card)

        return card?.id
      }

      return prevCardId
    })
    setOpenEditCardModal(true)
  }

  const onOpenChangeHandler = () => {
    setOpenEditCardModal(!openEditCardModal)
  }

  if (cardsError) {
    toast.error('Some error in the card page (')

    return <div>...Some Error!!!</div>
  }

  if (cardsLoading) {
    return <LoadingBar />
  }

  return (
    <Page className={s.page}>
      <NavLink className={s.navLink} to={'/'}>
        <Typography variant={'body1'}>
          <Icon height={'16'} iconId={'back'} viewBox={'0 -3 24 24'} width={'16'} />
          Back to Decks List
        </Typography>
      </NavLink>
      <div className={s.header}>
        <div className={s.titleBox}>
          <Typography variant={'h1'}>{deck?.name}</Typography>
          {deck?.userId === myId && <EditDropdown />}
        </div>
        {deck?.userId === myId && !!cards?.items.length && (
          <Button onClick={() => setOpenCreateCardModal(true)}>Add new Card</Button>
        )}
        {openCreateCardModal && (
          <CreateCardModal
            onOpenChange={() => setOpenCreateCardModal(!openCreateCardModal)}
            open={openCreateCardModal}
          />
        )}
        {openEditCardModal && (
          <CreateCardModal
            defaultCardValue={defaultCardValue}
            onOpenChange={onOpenChangeHandler}
            open={openEditCardModal}
            title={'Edit card'}
          />
        )}
      </div>
      {deck?.cover && <img alt={'deckCover'} className={s.deckCover} src={deck?.cover} />}
      {cards?.items.length ? (
        <>
          <TextField type={'search'} />
          <CardsTable
            cards={cards}
            myId={myId}
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCard}
            setSort={setSort}
            sort={sort}
          />
          <Pagination
            className={s.tablePagination}
            currentPage={cards?.pagination?.currentPage}
            itemsPerPage={cards?.pagination?.itemsPerPage}
            onPageChange={currentPageHandler}
            onPerPageChange={pageSizeHandler}
            perPageOptions={[5, 10, 15]}
            totalPageCount={cards.pagination.totalPages}
          />
          {openDeleteCardModal && (
            <DeleteDeck
              cardId={selectedCardId}
              description={'Do you really want to remove the card?'}
              onDeleteCard={deleteCard}
              onOpenChange={() => setOpenDeleteCardModal(!openDeleteCardModal)}
              open={openDeleteCardModal}
              title={'Confirm Action\n' + '\n'}
            />
          )}
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
        </div>
      )}
    </Page>
  )
}
