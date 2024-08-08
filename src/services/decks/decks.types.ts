export type DecksListResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type Author = {
  id: string
  name: string
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type CreateDeckArgs = {
  cover?: File | null
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = { id: string } & CreateDeckArgs
// export type UpdateDeckArgs = { id: string } & EditFormValues
export type DeleteDeckArgs = { id: string }

export type MinMaxCards = {
  max?: number
  min?: number
}

export type ErrorMessages = {
  field: string
  message: string
}

export type ErrorData = {
  errorMessages: ErrorMessages[]
}

export type ErrorResponse = {
  data: ErrorData
  status: number
}

export type DeckById = {
  id: string
}
export type CardsInADeck = {
  id: string
}

export type CardsInADeckItem = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CardsInADeckResponse = {
  items: CardsInADeckItem[]
  pagination: Pagination
}

export type CreateCardInDeck = {
  id: string
} & CardBody

export type CardBody = {
  answer: string
  answerImg?: string
  answerVideo?: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type GradeOfCardBody = {
  grade: 1 | 2 | 3 | 4 | 5
  id: string
}
