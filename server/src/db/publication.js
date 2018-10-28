import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Publication', PublicationSchema)
