import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/decks'
import { Tab } from '@/components/ui'
import { ErrorResponse } from '@/services/decks/decks.types'
import { useGetDecksQuery, useMinMaxCardsDeckQuery } from '@/services/decks/decksApi'

export const useDeckParams = () => {
  const [deckSearchParams, setDeckSearchParams] = useSearchParams()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sort, setSort] = useState<Sort>(null)
  const {
    data: cardsInDeck,
    error: cardsInDeckError,
    isLoading: cardsInDeckLoading,
  } = useMinMaxCardsDeckQuery()

  const minCardsInDeck = cardsInDeck?.min || 0
  const maxCardsInDeck = cardsInDeck?.max || 100
  const [cardsRange, setCardsRange] = useState<number[]>([minCardsInDeck, maxCardsInDeck])

  useEffect(() => {
    if (cardsInDeck) {
      setCardsRange([cardsInDeck.min ?? 0, cardsInDeck.max ?? 100])
    }
  }, [cardsInDeck])

  const handleSliderValueChange = (value: number[]) => {
    setCardsRange(value)
  }

  //deck name search query
  const handleSearchChange = (value: string) => {
    if (value.length) {
      deckSearchParams.set('name', value)
    } else {
      deckSearchParams.delete('name')
    }
    setDeckSearchParams(deckSearchParams)
  }

  const handleClearInput = () => {
    deckSearchParams.delete('name')
    setDeckSearchParams(deckSearchParams)
  }

  // tabs query
  const tabs: Tab[] = [
    { disabled: false, title: 'My decks', value: 'my' },
    { disabled: false, title: 'All decks', value: 'all' },
  ]

  const currentTab = deckSearchParams.get('currentTab' || 'all')
  const handleTabChange = (tab: string) => {
    deckSearchParams.set('currentTab', tab)
    setDeckSearchParams(deckSearchParams)
  }

  //current page query
  const currentPage = Number(deckSearchParams.get('currentPage') || 1)
  const handlePageChange = (page: number) => {
    deckSearchParams.set('currentPage', page.toString())
    setDeckSearchParams(deckSearchParams)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
  }

  const clearFilters = () => {
    setSort(null)
    setCardsRange([0, maxCardsInDeck])
    setDeckSearchParams({})
  }

  const {
    data: decks,
    error: getDecksError,
    isLoading: getDecksLoading,
  } = useGetDecksQuery({
    authorId: deckSearchParams.get('authorId') ?? '',
    currentPage,
    itemsPerPage,
    maxCardsCount: cardsRange[1],
    minCardsCount: cardsRange[0],
    name: deckSearchParams.get('name') || undefined,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const decksLoading = getDecksLoading || cardsInDeckLoading

  const error = [
    ...((cardsInDeckError as ErrorResponse)?.data.errorMessages || []),
    ...((getDecksError as ErrorResponse)?.data.errorMessages || []),
  ]
  const decksError = error.length ? error : null

  return {
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
  }
}
