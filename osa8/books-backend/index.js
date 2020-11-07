const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = 'SOME_SECRET_HERE'

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

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
        user: User
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author!]!
        me: User
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
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            /*
            Some filters Disabled
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
                const books = await Book.find({})
                return books.filter(book => book.genres.includes(args.genre))
            }

            return Book.find({})
        },
        allAuthors: () => { return Author.find({})},
        me: async(root, args, context) => {
            return context.currentUser
        }
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
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if(!currentUser) {
                throw new AuthenticationError('not logged in')
            }

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
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if(!currentUser) {
                throw new AuthenticationError('not logged in')
            }
            
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
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            // Hardcoded password for dev purposes
            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET), user: user}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization: null
        if(auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})