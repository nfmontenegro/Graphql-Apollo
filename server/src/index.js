import {GraphQLServer} from 'graphql-yoga'
import {initDB, models} from './db'
import {default as typeDefs} from './graphql/typeDefs'
import {default as resolvers} from './graphql/resolvers'

require('dotenv').config()

const db = initDB({
  name: process.env.DB_NAME,
  url: process.env.DB_HOST
})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db,
    models
  }
})

const PORT = process.env.SERVER_PORT || 3000

server.start(PORT, () => {
  console.log(`=> Server is running on: http://localhost:${PORT}`)
})
