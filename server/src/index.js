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
  context: req => ({
    ...req,
    db,
    models
  })
})

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
