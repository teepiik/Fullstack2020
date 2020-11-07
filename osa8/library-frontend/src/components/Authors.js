import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import Select from 'react-select';

const Authors = (props) => {
  const authors = props.authors;
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        props.setError(error.graphQLErrors[0].message);
      } else {
        console.log(error);
      }
    },
  });

  const options = [];
  Object.entries(authors).forEach(([key, value]) => {
    options.push({ value: value.name, label: value.name });
  });

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      props.notify('author not found');
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: born } });
    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Update author</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} />
        </div>
        <div>
          <Select
            value={name}
            onChange={(event) => setName(event.value)}
            options={options}
          />
        </div>
        <div>
          Year of birth
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default Authors;
