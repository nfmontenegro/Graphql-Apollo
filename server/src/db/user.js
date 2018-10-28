import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  website: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  file: {
    type: String
  },
  imageUrl: {
    type: String
  }
})

export default mongoose.model('User', UserSchema)
