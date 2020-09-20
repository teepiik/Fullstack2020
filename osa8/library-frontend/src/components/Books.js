import React, { useState } from 'react';

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const books = props.books;
  const totalBooks = props.totalBooks;
  const filters = [];

  books.forEach((book) => {
    book.genres.forEach((genre) =>
      filters.includes(genre) ? null : filters.push(genre)
    );
  });

  console.log(filters);

  if (!props.show) {
    return null;
  }

  // Filter books
  let filteredBooks = books;
  if (filter) {
    filteredBooks = books.filter((book) => book.genres.includes(filter));
  }

  const handleSelect = (event) => {
    if (event.target.value === 'all') {
      setFilter(null);
      return;
    }
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total books count: {totalBooks}</p>
      <h3>Set filter</h3>
      <select onChange={handleSelect}>
        <option value='' selected disabled hidden>
          Choose filter
        </option>
        {filters.map((filter) => (
          <option value={filter}>{filter}</option>
        ))}
        <option value='all'>clear filter</option>
      </select>
    </div>
  );
};

export default Books;
