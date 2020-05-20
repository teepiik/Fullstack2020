const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()
//let { books, authors } = require('./data')
//const uuid = require('uuid/v1')

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
    Author: {
        // NOTE might be more sensible to do this on db side.
        bookCount: async root => {
            const resbooks = await Book.find({})
            return resbooks.filter(book => book.author === root.name).length
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            try {
                const author = await Author.findOne({ name: args.author })
                console.log(author)
                if(author === null || author === undefined) {
                    const newAuthor = new Author({ name: args.author, born: null })
                    savedAuthor = await newAuthor.save()
                    console.log('tekee hommii')
                    // Tarvii nyt authoriin ID:n arvoksi, ei nimeä
                    console.log('HEELELELELELELLELELELELEL')
                    console.log(savedAuthor)
                    console.log({ ...args, author: savedAuthor._id})
                    const newBook = new Book({ ...args, author: savedAuthor._id}) // TODO TÄMÄ KUNTOON
                    console.log(newBook)
                    // TODO ADD book to author
                    const savedBook = await newBook.save()
                    return savedBook
                } else {
                    const newBook = new Book({ ...args })
                    console.log(newBook)
                    // NEED FIXING
                    // TODO ADD book to author
                    const savedBook = await newBook.save()
                    return savedBook
                }
            } catch(error) {
                console.log(error)
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
             // TODO AUTHORS Book linked
        },
        editAuthor: async (root, args) => {
            try {
                const author = await Author.findOne({ name: args.author })
                if(author === null || author === undefined) {
                    return null
                }
                const updated = { ...author, born: args.setBornTo}
                // TODO DB SAVE
                //authors = authors.map(a => a.name === args.name ? updated : a)
                //return updated

            } catch(error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
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