import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Publication', PublicationSchema)
