import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { flashcardsApi } from './flashcards-api'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  reducer: {
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})

setupListeners(store.dispatch)
