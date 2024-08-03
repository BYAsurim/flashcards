import { baseQueryWithReAuth } from '@/services/flashCardsBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  reducerPath: 'flashcardsApi',
  tagTypes: ['Deck', 'MinMaxCards', 'Card', 'MinMaxCards', 'Me'],
})
