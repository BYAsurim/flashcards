import { Button, Header, Slider, Tabs, TextField, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { MainTable } from '@/components/ui/table'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'
import { useDeckParams } from '@/services/decks/useDeckParams'

import s from './decks.page.module.scss'

export function DecksPage() {
  const {
    cardsRange,
    clearFilters,
    currentPage,
    // currentTab,
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
    tabs,
  } = useDeckParams()

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const createDeckHandler = () => {
    createDeck({
      cover: 'https://i.pinimg.com/564x/c8/60/9d/c8609d48d7793d52bf2cf9fa55c9342f.jpg',
      isPrivate: true,
      name: 'Nana 👩‍🦰💕🍓🐶',
    })
  }
  const updateDeckHandler = (id: string) => {
    updateDeck({ id, name: 'Nana 👩‍🦱🎸🎙🤘' })
  }

  const deleteDeckHandler = (id: string) => {
    deleteDeck({ id })
  }

  if (decksError) {
    return <div>ERROR!!!!</div>
  }

  if (decksLoading) {
    return <div>...Loading</div>
  }

  return (
    <>
      <Header />
      <div className={s.deckTable}>
        <div className={s.tableHead}>
          <Typography variant={'h1'}>Decks list</Typography>
          <Button onClick={createDeckHandler}>Add new Deck</Button>
        </div>
        <div className={s.filtersWrap}>
          <TextField
            onBlur={handleClearInput}
            onChange={e => handleSearchChange(e.currentTarget.value)}
            type={'search'}
            value={deckSearchParams.get('name') ?? ''}
          />
          <Tabs label={'Show decks'} onValueChange={handleTabChange} tabs={tabs} />
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
            decks={decks?.items}
            onDeleteClick={deleteDeckHandler}
            onEditClick={updateDeckHandler}
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
    </>
  )
}
