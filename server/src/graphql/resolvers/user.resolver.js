import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    listUsers: async (_, params, {models: {User}, req}) => {
      console.log('Context:', req)
      // console.log('Request:', req)
      // return await User.find({})
    },

    user: async (_, params, {models: {User}, request}) => {
      console.log('Headers,', request.headers)
      const user = await User.findById(params)
      if (user) return user
      throw new Error(`No user with that id: ${params._id}`)
    }
  },

  Mutation: {
    deleteUser: async (_, params, {models: {User}}) => {
      const user = await User.findOneAndDelete(params)
      if (user) return `User removed ${params._id}`
      throw new Error(`No user with that id: ${params._id}`)
    },

    registerUser: async (_, params, {models: {User}}) => {
      const user = await User.findOne({
        email: params.email
      })

      if (!user) {
        const {name, lastname, email, password} = params

        const user = await User.create({
          name,
          lastname,
          email,
          password: await bcrypt.hash(password, 10)
        })
        return user
      } else {
        throw new Error(`User exist with email ${params.email}`)
      }
    },

    loginUser: async (_, {email, password}, {models: {User}, req}) => {
      const user = await User.findOne({
        email
      })

      if (!user) {
        throw new Error(`No user with that email: ${email}`)
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        process.env.SECRET_PASSWORD,
        {
          expiresIn: '1y'
        }
      )

      req.token = token
      return token
    },

    updateUser: async (_, params, {models: {User}}) => {
      const {_id, ...rest} = params

      await User.findOneAndUpdate(
        {
          _id
        },
        rest
      )

      return await User.findOne({_id})
    }
  }
}
