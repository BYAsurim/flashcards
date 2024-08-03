import { useState } from 'react'

import { MainTable } from '@/components/decks'
import { Button, Slider, Tabs, TextField, Typography } from '@/components/ui'
import CreateDeck from '@/components/ui/modals/dialog/createDeckModal/createDeck'
import { DeleteDeck } from '@/components/ui/modals/dialog/deleteDeckDialog/deleteDeck'
import { Page } from '@/components/ui/page'
import { Pagination } from '@/components/ui/pagination'
import { useGetMeQuery } from '@/services/auth'
import { useUpdateDeckMutation } from '@/services/decks/decksApi'
import { useDeckParams } from '@/services/decks/useDeckParams'

import s from './decks.page.module.scss'

export function DecksPage() {
  const {
    cardsRange,
    clearFilters,
    currentPage,
    currentTab,
    deckSearchParams,
    decks,
    decksError,
    decksLoading,
    handleClearInput,
    handleItemsPerPageChange,
    handlePageChange,
    handleSearchChange,
    handleSliderValueChange,
    handleTabChange,
    itemsPerPage,
    maxCardsInDeck,
    minCardsInDeck,
    setSort,
    sort,
    tabs,
  } = useDeckParams()
  const { data: user } = useGetMeQuery()
  const [updateDeck] = useUpdateDeckMutation()
  const { data } = useGetMeQuery()
  const [open, setOpen] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [idForDelete, setIdForDelete] = useState('')
  const updateDeckHandler = (id: string) => {
    updateDeck({ id, name: 'Nana 👩‍🦱🎸🎙🤘' })
  }

  const deleteDeckHandler = (id: string) => {
    setOpenDeleteModal(true)
    setIdForDelete(id)
  }

  const myDecksTabHandler = (value: string) => {
    if (value === 'all') {
      deckSearchParams.delete('authorId')
      handleTabChange(value)
    }
    if (value === 'my' && user) {
      deckSearchParams.set('authorId', user.id)
      handleTabChange(value)
    }
  }

  if (decksError) {
    return <div>ERROR!!!!</div>
  }

  if (decksLoading) {
    return <div>...Loading</div>
  }

  return (
    <>
      <Page>
        <div className={s.deckTable}>
          <div className={s.tableHead}>
            {open && (
              <CreateDeck
                onOpenChange={() => setOpen(!open)}
                open={open}
                title={'Creating a New Deck\n' + '\n'}
              />
            )}
            {openDeleteModal && (
              <DeleteDeck
                id={idForDelete}
                onOpenChange={() => setOpenDeleteModal(!openDeleteModal)} //remove trigger button for modals
                open={openDeleteModal}
                title={'Confirm Action\n' + '\n'}
              />
            )}
            <Typography variant={'h1'}>Decks list</Typography>
            <Button onClick={() => setOpen(true)}>Add new Deck</Button>
          </div>
          <div className={s.filtersWrap}>
            <TextField
              onBlur={handleClearInput}
              onChange={e => handleSearchChange(e.currentTarget.value)}
              type={'search'}
              value={deckSearchParams.get('name') ?? ''}
            />
            <Tabs
              label={'Show decks'}
              onValueChange={myDecksTabHandler}
              tabs={tabs}
              value={currentTab ?? ''}
            />
            <Slider
              max={maxCardsInDeck}
              min={minCardsInDeck}
              onValueChange={handleSliderValueChange}
              value={cardsRange}
            />
            <Button onClick={clearFilters} variant={'secondary'}>
              Clear filter
            </Button>
          </div>
          <div className={s.tableWrap}>
            <MainTable
              data={data}
              decks={decks?.items}
              onDeleteClick={deleteDeckHandler}
              onEditClick={updateDeckHandler}
              setSort={setSort}
              sort={sort}
            />
            <Pagination
              className={s.tablePagination}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onPerPageChange={handleItemsPerPageChange}
              perPageOptions={[5, 10, 15]}
              totalPageCount={decks?.pagination?.totalPages}
            />
          </div>
        </div>
      </Page>
    </>
  )
}
