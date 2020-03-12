const { ApolloServer, gql } = require('apollo-server')
const { books, authors } = require('./data')

const typeDefs = gql`
    type Query {
    }
`

const resolvers = {
    Query: {
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})