export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}
export type User = {
  avatar: string
  created: Date
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: Date
}
