import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import { ChatServer } from './chat-server'
import { MONGODB_URI } from './util/secrets'

const app = new ChatServer().getApp()
;(<any>mongoose).Promise = bluebird
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch(() => {
    throw 'Connected to mongodb error'
  })

export { app }
