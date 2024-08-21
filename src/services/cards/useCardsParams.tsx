import { useMemo, useState } from 'react'
import { Params, useParams, useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/decks'
import { useDebounce } from '@/hooks'
import { useGetMeQuery } from '@/services/auth'
import { useCardsInADeckQuery, useDeckByIdQuery } from '@/services/decks'

export const UseCardsParams = () => {
  const params: Readonly<Params> = useParams()
  const [cardsSearchParams, setCardsSearchParams] = useSearchParams()
  const debouncedSearch = useDebounce(cardsSearchParams, 500)
  // const [cardsPerPage, setCardsPerPage] = useState(5)
  const [sort, setSort] = useState<Sort>(null)
  const { data: me } = useGetMeQuery()

  const {
    data: deck,
    error: deckError,
    isLoading: isLoadingDeck,
  } = useDeckByIdQuery({ id: params?.deckId || '' })

  const isMy = me?.id === deck?.userId

  //search params by SearchInput
  const searchChangeHandle = (value: string) => {
    if (value.length) {
      cardsSearchParams.set('question', value)
    } else {
      cardsSearchParams.delete('question')
    }
    setCardsSearchParams(cardsSearchParams)
  }
  //clear SearchInput
  const onClearClick = () => {
    cardsSearchParams.delete('question')
    setCardsSearchParams(cardsSearchParams)
  }

  //current page query
  const pageSizeHandler = (itemsPerPage: number) => {
    cardsSearchParams.set('itemsPerPage', itemsPerPage.toString())
    setCardsSearchParams(cardsSearchParams)
  }
  const currentPageHandler = (currentPage: number) => {
    cardsSearchParams.set('currentPage', currentPage.toString())
    setCardsSearchParams(cardsSearchParams)
  }
  const sortedString = useMemo(() => {
    if (!sort) {
      cardsSearchParams.delete(`orderBy`)
      setCardsSearchParams(cardsSearchParams)

      return null
    }
    cardsSearchParams.set(`orderBy`, `${sort.key}-${sort.direction}`)
    setCardsSearchParams(cardsSearchParams)

    return `${sort.key}-${sort.direction}`
  }, [cardsSearchParams, setCardsSearchParams, sort])

  const {
    data: cards,
    error: cardsError,
    isLoading: isLoadingCards,
  } = useCardsInADeckQuery({
    currentPage: Number(cardsSearchParams.get('currentPage')) || 1,
    id: params?.deckId ?? '',
    itemsPerPage: Number(cardsSearchParams.get('itemsPerPage') || 5),
    orderBy: sortedString || undefined,
    question: debouncedSearch.get('question') || undefined,
  })

  return {
    cards,
    cardsError,
    cardsSearchParams,
    currentPageHandler,
    deck,
    deckError,
    isLoadingCards,
    isLoadingDeck,
    isMy,
    onClearClick,
    pageSizeHandler,
    searchChangeHandle,
    setSort,
    sort,
  }
}
