export default {
  Query: {
    listPublications: async (_, params, {models: {Publication}}) => {
      return await Publication.find({}).populate('user')
    }
  },
  Mutation: {
    createPublication: async (
      _,
      {title, description, user},
      {models: {Publication}, request: {userAccess}}
    ) => {
      if (!userAccess) throw new Error(`Don't have permissions`)

      const publication = await Publication.create({
        title,
        description,
        user
      })

      const sample = await Publication.findOne({
        title: 'Manchi Perdida'
      }).populate('user')

      console.log(sample)
      return sample
    }
  }
}
