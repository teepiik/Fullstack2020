import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books
  const totalBooks = props.totalBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>Total books count: {totalBooks}</p>
    </div>
  )
}

export default Books