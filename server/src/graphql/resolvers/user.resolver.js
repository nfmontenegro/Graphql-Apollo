import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
  Query: {
    listUsers: async (_, params, {models: {User}, request: {userAccess}}) => {
      if (!userAccess) throw new Error(`Don't have permissions`)
      return await User.find({})
    },

    user: async (_, {token}, {models: {User}, request: {userAccess}}) => {
      if (!userAccess) throw new Error(`Don't have permissions`)
      const {id} = jwt.decode(token, process.env.SECRET_PASSWORD)
      const user = await User.findById({_id: id})
      if (user) return user
      throw new Error(`No user with that id: ${id}`)
    },

    checkToken: async (_, params, {request: {userAccess}}) => {
      if (!userAccess) throw new Error(`Don't have permissions`)
      return {status: 200, message: 'Success token'}
    }
  },

  Mutation: {
    deleteUser: async (_, {_id}, {models: {User}, request: {userAccess}}) => {
      if (!userAccess) throw new Error(`Don't have permissions`)

      const user = await User.findOneAndDelete({_id})
      if (user) return `User removed ${_id}`

      throw new Error(`No user with that id: ${_id}`)
    },

    registerUser: async (
      _,
      {name, lastname, email, password, nickname, website, phoneNumber},
      {models: {User}}
    ) => {
      try {
        const user = await User.findOne({
          email
        })

        if (!user) {
          const user = await User.create({
            name,
            lastname,
            email,
            nickname,
            website,
            phoneNumber,
            password: await bcrypt.hash(password, 10)
          })

          console.log('User:', user)
          return user
        } else {
          throw new Error(`User exist with email ${email}`)
        }
      } catch (err) {
        console.log(err)
      }
    },

    payloadLoginUser: async (
      _,
      {email, password},
      {models: {User}, ...rest}
    ) => {
      const user = await User.findOne({
        email
      })

      if (!user) {
        throw new Error(`No user with that email: ${email}`)
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Invalid Password')
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

      return {
        user,
        token,
        status: 200
      }
    },

    updateUser: async (
      _,
      {_id, ...rest},
      {models: {User}, request: {userAccess}}
    ) => {
      if (!userAccess) throw new Error(`Don't have permissions`)
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
