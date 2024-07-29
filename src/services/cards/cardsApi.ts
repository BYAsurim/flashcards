import { CardId, CardResponse, UpdateCard } from '@/services/cards/cardsApi.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const cardApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCardById: builder.mutation<void, CardId>({
        invalidatesTags: ['Card', 'Deck'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCardById: builder.query<CardResponse, CardId>({
        providesTags: ['Card'],
        query: ({ id }) => ({
          url: `/v1/cards/${id}`,
        }),
      }),
      updateCard: builder.mutation<CardResponse, UpdateCard>({
        invalidatesTags: ['Card'],
        query: ({ id, ...body }) => ({
          body,
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }),
      }),
    }
  },
  overrideExisting: false,
})

export const { useDeleteCardByIdMutation, useGetCardByIdQuery, useUpdateCardMutation } = cardApi
