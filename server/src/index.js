import {GraphQLServer} from 'graphql-yoga'
import {initDB, models} from './db'
import {default as typeDefs} from './graphql/typeDefs'
import {default as resolvers} from './graphql/resolvers'
import jwt from 'jsonwebtoken'

require('dotenv').config()

const db = initDB({
  name: process.env.DB_NAME,
  url: process.env.DB_HOST
})

const addUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (token) {
      const {email} = await jwt.verify(token, process.env.SECRET_PASSWORD)
      req.userAccess = email
    }
    next()
  } catch (err) {
    //validate error in the resolver
    next()
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db,
    userAccess: req.userAccess,
    models
  })
})

server.express.use(addUser)

const PORT = process.env.SERVER_PORT || 3000

const opts = {
  port: PORT
}

server.start(opts, () => {
  console.log('##########################################################')
  console.log('#####               STARTING SERVER                  #####')
  console.log('##########################################################\n')
  console.log(`=> Server is running on: http://localhost:${PORT}`)
})
