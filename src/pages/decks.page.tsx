import { useState } from 'react'

import { Button, TextField, Typography } from '@/components/ui'
import { MainTable } from '@/components/ui/table'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'

export function DecksPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useGetDecksQuery({
    currentPage: page,
    itemsPerPage: 3,
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

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>...Loading</div>
  }

  return (
    <div>
      <div>
        <Button onClick={createDeckHandler}>Add new Deck</Button>
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
