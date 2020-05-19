const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
let { books, authors } = require('./data')
const uuid = require('uuid/v1')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to MongoDB')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

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
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            /*
            Filters Disabled
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
            }*/

            return Book.find({})
        },
        allAuthors: () => { return Author.find({})}
    },
    // JATKA TÄSTÄÄÄÄÄÄÄ!!!!
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