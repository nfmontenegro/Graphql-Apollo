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

server.express.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (token) {
      const bearer = token.split(' ')
      const bearerToken = bearer[1]
      const {email} = await jwt.verify(bearerToken, process.env.SECRET_PASSWORD)
      req.userAccess = email
    }
    next()
  } catch (err) {
    //validate error in the resolver
    next()
  }
})

const PORT = process.env.SERVER_PORT || 3000

const opts = {
  port: PORT
}

server.start(opts, () => {
  console.log('\n')
  console.log('=> Starting server..')
  console.log(`=> GraphiQL running on: http://localhost:${PORT}`)
})
