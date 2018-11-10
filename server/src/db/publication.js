import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

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
  formatDate: {
    type: String
  },
  imageUrl: {
    type: String
  },
  file: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Publication', PublicationSchema)
