
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_COUNT } from './queries'

const Notify = ({ errorMsg }) => {
  if(!errorMsg) return null
  return (
    <div style={{color: 'red'}}>
      {errorMsg}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(null)

  const authorsData = useQuery(ALL_AUTHORS)
  const booksData = useQuery(ALL_BOOKS)

  const res = useQuery(BOOK_COUNT)
  let totalBooks
  if(res.data) {
  totalBooks = res.data.bookCount
  }

  const notify = (message) => {
    setErrorMsg(message)
    setTimeout(() => {
      setErrorMsg(null)
    }, 10000)
  }

  if(!token) {
    return (
      <div>
        <Notify errorMsg={errorMsg} />
        <h2>Login</h2>
        <LoginForm
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }

  if (authorsData.loading || booksData.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMsg={errorMsg} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={authorsData.data.allAuthors}
        show={page === 'authors'}
        notify={notify}
      />

      <Books
        books={booksData.data.allBooks}
        show={page === 'books'}
        totalBooks={totalBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  )
}

export default App