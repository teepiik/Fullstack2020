const { ApolloServer, gql } = require('apollo-server')
let { books, authors } = require('./data')
const uuid = require('uuid/v1')

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }

    type Book {
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if(args.author && args.genre) {
                return books
                            .filter(book => book.author === args.author)
                            .filter(book => book.genres.includes(args.genre))
            }

            if(args.author) {
                return books.filter(book => book.author === args.author)
            }

            if(args.genre) {
                return books.filter(book => book.genres.includes(args.genre))
            }

            return books
        },
        allAuthors: () => authors
    },
    Author: {
        bookCount: root => {
            return books.filter(book => book.author === root.name).length
        }
    },

    Mutation: {
        addBook: (root, args) => {
            if(!authors.find(a => a.name === args.author)) {
                const newAuthor = { name: args.author, born: null, id: uuid()}
                authors = authors.concat(newAuthor)
            }
            const newBook = { ...args, id: uuid()}
            books = books.concat(newBook)
            return newBook
        },
        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if(!author) {
                return null
            }
            const updated = { ...author, born: args.setBornTo}
            authors = authors.map(a => a.name === args.name ? updated : a)
            return updated
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})