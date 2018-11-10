import dayjs from 'dayjs'

export default {
  Query: {
    listPublications: async (_, params, {models: {Publication}}) =>
      await Publication.find({}).populate('user'),
    listPublication: async (_, {_id}, {models: {Publication}}) => {
      const publication = await Publication.findOne({_id}).populate('user')
      if (publication) {
        return publication
      } else {
        return new Error(`No publication with that id ${_id}`)
      }
    }
  },
  Mutation: {
    createPublication: async (
      _,
      {title, description, user, content, imageUrl, file},
      {models: {Publication}, request: {userAccess}}
    ) => {
      if (!userAccess) return new Error(`Don't have permissions`)

      const {_id} = await Publication.create({
        title,
        description,
        user,
        content,
        imageUrl,
        file,
        formatDate: dayjs()
          .format('YYYY-MM-DD HH:mm:ss')
          .toString()
      })

      return await Publication.findOne({_id}).populate('user')
    },
    updatePublication: async (
      _,
      {_id, userId, ...rest},
      {models: {Publication}, request: {userAccess}}
    ) => {
      if (!userAccess) return new Error(`Don't have permissions`)
      const publication = await Publication.findOneAndUpdate(
        {
          _id,
          user: userId
        },
        rest
      )

      if (!publication) return new Error(`Can't update this publication`)

      return await Publication.findOne({_id}).populate('user')
    },
    deletePublication: async (
      _,
      {_id},
      {models: {Publication}, request: {userAccess}}
    ) => {
      if (!userAccess) return new Error(`Don't have permissions`)

      const publication = await Publication.findOneAndDelete({_id})
      if (!publication) return new Error(`No publication with that id: ${_id}`)
      return `Publication removed ${_id}`
    }
  }
}
