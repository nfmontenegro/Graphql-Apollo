import mongoose from 'mongoose'
import User from './user'
import Publication from './publication'

mongoose.Promise = global.Promise

mongoose.set('useCreateIndex', true)

export const initDB = ({name, url}) =>
  mongoose.connect(
    `mongodb://${url}/${name}`,
    {
      useNewUrlParser: true
    }
  )

export const models = {
  User,
  Publication
}
