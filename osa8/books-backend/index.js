const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

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
        // TODO FIX COUNTS
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
            */
            if(args.genre) {
                return Book.find({}).filter(book => book.genres.includes(args.genre))
            }

            return Book.find({})
        },
        allAuthors: () => { return Author.find({})}
    },
    Author: {
        // NOTE might be more sensible to do this on db side.
        bookCount: async root => {
            const allBooks = await Book.find({}) // For every author this takes all books, not ideal.
            const filtered = allBooks.filter(book => book.author.equals(root._id))
            return filtered.length
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            try {
                const author = await Author.findOne({ name: args.author })

                if(author === null || author === undefined) {
                    const newAuthor = new Author({ name: args.author, born: null })
                    savedAuthor = await newAuthor.save()

                    const newBook = new Book({ ...args, author: savedAuthor._id})
                    const savedBook = await newBook.save()
                    return savedBook
                } else {
                    const newBook = new Book({ ...args, author: author._id })
                    const savedBook = await newBook.save()
                    return savedBook
                }
            } catch(error) {
                console.log(error)
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        editAuthor: async (root, args) => {
            try {
                const author = await Author.findOne({ name: args.name })

                if(author === null || author === undefined) {
                    return null
                }

                const forUpdate = {
                    _id: author.id,
                    name: author.name,
                    born: args.setBornTo
                }
                const updated = await Author.findByIdAndUpdate(forUpdate._id, forUpdate, { new: true })
                return updated

            } catch(error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
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