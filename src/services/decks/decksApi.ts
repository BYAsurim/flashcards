import {
  CardsInADeck,
  CardsInADeckItem,
  CardsInADeckResponse,
  CreateCardInDeck,
  Deck,
  DeckById,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  GradeOfCardBody,
  MinMaxCards,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const deckApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addDeckToFavorites: builder.mutation<void, CardsInADeck>({
        invalidatesTags: ['Deck'],
        query: ({ id }) => ({
          method: 'POST',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      cardsInADeck: builder.query<CardsInADeckResponse, CardsInADeck>({
        providesTags: ['Deck'],
        query: ({ id, ...params }) => ({
          params: params,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      createCardInDeck: builder.mutation<CardsInADeckItem, CreateCardInDeck>({
        invalidatesTags: ['Deck'],
        query: ({ formData, id }) => ({
          body: formData,
          method: 'POST',
          url: `v1/decks/${id}/cards`,
        }),
      }),
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Deck'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deckById: builder.query<Deck, DeckById>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
      }),
      deleteDeck: builder.mutation<Deck, DeleteDeckArgs>({
        invalidatesTags: ['Deck'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Deck'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      gradeOfCard: builder.mutation<CardsInADeckItem, GradeOfCardBody>({
        invalidatesTags: ['Deck'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${args.cardId}/learn`,
        }),
      }),
      minMaxCardsDeck: builder.query<MinMaxCards, void>({
        providesTags: ['MinMaxCards'],
        query: () => ({
          url: `v2/decks/min-max-cards`,
        }),
      }),
      randomCard: builder.query<CardsInADeckItem, CardsInADeck>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `v1/decks/${id}/learn`,
        }),
      }),
      removeDeckFromFavorites: builder.mutation<void, CardsInADeck>({
        invalidatesTags: ['Deck'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Deck'],
        query: ({ id, ...body }) => {
          const { cover, isPrivate, name } = body
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }
          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }
          if (cover) {
            formData.append('cover', cover)
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },

  overrideExisting: false,
})

export const {
  useAddDeckToFavoritesMutation,
  useCardsInADeckQuery,
  useCreateCardInDeckMutation,
  useCreateDeckMutation,
  useDeckByIdQuery,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGradeOfCardMutation,
  useMinMaxCardsDeckQuery,
  useRandomCardQuery,
  useRemoveDeckFromFavoritesMutation,
  useUpdateDeckMutation,
} = deckApi
