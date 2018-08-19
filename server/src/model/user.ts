import * as mongoose from 'mongoose'

export class User {
  constructor(private name: string) {}
}
export type AuthToken = {
  accessToken: string
  kind: string
}
export type UserModel = mongoose.Document & {
  email: string
  password: string
  passwordResetToken: string
  passwordResetExpires: Date

  facebook: string
  tokens: AuthToken[]

  profile: {
    name: string
    gender: string
    location: string
    website: string
    picture: string
  }

  comparePassword: comparePasswordFunction
  gravatar: (size: number) => string
}
type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {}
) => void
