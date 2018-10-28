import {mergeResolvers} from 'merge-graphql-schemas'
import userResolvers from './user.resolver'
import publicationResolver from './publication.resolver'

/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
// const resolversArray = [userResolvers, welcomeResolvers];
/*  AUTOMATED APPROACH: Put your resolvers anywhere
    with ".resolvers.[js/ts]" naming convention */
const resolversArray = [userResolvers, publicationResolver]

const resolvers = mergeResolvers(resolversArray)

export default resolvers
