const { ApolloServer } = require('apollo-server');
const { databaseConnection, sq } = require("./db/connection")

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

databaseConnection().then(async () => {
  await sq.sync()

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`GraphQL server running at ${url}`)
  })
})

