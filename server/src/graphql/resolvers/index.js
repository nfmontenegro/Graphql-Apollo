import {mergeResolvers} from 'merge-graphql-schemas'
import userResolvers from '@App/graphql/resolvers/user.resolver'
import publicationResolvers from '@App/graphql/resolvers/publication.resolver'

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
// const resolversArray = [userResolvers, welcomeResolvers];
/*  AUTOMATED APPROACH: Put your resolvers anywhere
    with ".resolvers.[js/ts]" naming convention */
const resolversArray = [userResolvers, publicationResolvers]

const resolvers = mergeResolvers(resolversArray)

export default resolvers
