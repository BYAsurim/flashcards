export type CardId = {
  id: string
}

export type CardResponse = {
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

export type UpdateCardBody = {
  answer: string
  answerImg: string
  answerVideo: string
  question: string
  questionImg: string
  questionVideo: string
}

export type UpdateCard = CardId & UpdateCardBody
