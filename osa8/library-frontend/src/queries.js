import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
      id
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const BOOK_COUNT = gql`
  query {
    bookCount
  }
`

export const AUTHOR_COUNT = gql`
  query {
    authorCount
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor( name: $name, setBornTo: $setBornTo ) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login( username: $username, password: $password ) {
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $favoriteGenre: String!) {
    createUser( username: $username, favoriteGenre: $favoriteGenre ) {
      username
      favoriteGenre
    }
  }
`