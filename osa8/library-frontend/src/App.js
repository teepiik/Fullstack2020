import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';
import Recommendations from './components/Recommendations';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_COUNT,
  ALL_BOOKS_GENREFILT,
} from './queries';

const Notify = ({ errorMsg }) => {
  if (!errorMsg) return null;
  return <div style={{ color: 'red' }}>{errorMsg}</div>;
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  const authorsData = useQuery(ALL_AUTHORS);
  const booksData = useQuery(ALL_BOOKS);
  const [allBooksByGenre, result] = useLazyQuery(ALL_BOOKS_GENREFILT);

  const res = useQuery(BOOK_COUNT);
  let totalBooks;
  if (res.data) {
    totalBooks = res.data.bookCount;
  }

  const fetch = (genre) => {
    console.log(genre);
    allBooksByGenre({ variables: { genre: genre } });
  };

  useEffect(() => {
    console.log('user')
    console.log(user);
    fetch(user ? user.favoriteGenre : '');
    if (result.data) {
      console.log('result data')
      console.log(result.data);
    }
  }, [user]);

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null);
    }, 10000);
  };

  const containerStyle = {
    margin: '3rem',
  };

  if (!token) {
    return (
      <div style={containerStyle}>
        <Notify errorMsg={errorMsg} />
        <h2>Login</h2>
        <LoginForm setError={notify} setToken={setToken} setUser={setUser} />
        <UserForm setError={notify} />
      </div>
    );
  }

  if (authorsData.loading || booksData.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div style={containerStyle}>
      <Notify errorMsg={errorMsg} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>
          recommendations
        </button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
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
        notify={notify}
      />

      <Recommendations show={page === 'recommendations'} notify={notify} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  );
};

export default App;
