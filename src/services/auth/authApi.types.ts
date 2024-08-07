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
export type SignUpArgs = {
  email: string
  name?: string
  password: string
}
export type ResetPasswordArgs = {
  password: string
  token: string
}
export type AuthErrorResponse = {
  data: {
    message: string
    statusCode: number
  }
}
