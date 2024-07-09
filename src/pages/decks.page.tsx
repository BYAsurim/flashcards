import { useState } from 'react'

import { Button, Header, Slider, TextField, Typography } from '@/components/ui'
import { MainTable } from '@/components/ui/table'
import { MinMaxCards } from '@/services/decks/decks.types'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'

export function DecksPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [minMax, setMinMax] = useState<MinMaxCards>({})
  const { data, isError, isLoading } = useGetDecksQuery({
    currentPage: page,
    itemsPerPage: 3,
    maxCardsCount: minMax.max,
    minCardsCount: minMax.min,
    name: search,
  })

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
  const minMaxCardsHandler = () => {
    setMinMax({ max: 8, min: 3 })
  }

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>...Loading</div>
  }

  return (
    <div>
      <Header />
      <div>
        <Button onClick={createDeckHandler}>Add new Deck</Button>
        <Button onClick={minMaxCardsHandler}>Min-Max Cards</Button>
        <Slider max={61} value={[0, 61]} />
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          flexDirection: 'column',
          margin: '20px',
        }}
      >
        <TextField
          onChange={e => setSearch(e.currentTarget.value)}
          type={'search'}
          value={search}
        />

        <MainTable
          decks={data?.items}
          onDeleteClick={deleteDeckHandler}
          onEditClick={updateDeckHandler}
        />
      </div>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous page
      </Button>
      <Typography variant={'body2'}>{page}</Typography>
      <Button disabled={data?.pagination.totalPages === page} onClick={() => setPage(page + 1)}>
        Next page
      </Button>
    </div>
  )
}
