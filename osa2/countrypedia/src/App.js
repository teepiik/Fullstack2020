import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './Countries'

const Filter = (props) => {
    return (
        <div>
            <h2>Search</h2>
            <input value={props.filter} onChange={props.handleFilterChange}/>
        </div>
    )
}

const App = () => {
    const [ filter, setFilter] = useState([''])
    const [ countries, setCountries] = useState([''])

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const handleFilterChange = (event) => {
        // convert to uppercase start
        setFilter(event.target.value)
    }

    const handleCountrySelection = (name) => {
        console.log(name)
        setFilter(name)
    }

    if(countries=='' || countries==null) {
        return (
            <div>Loading data</div>
        )
    }

    return (
      <div>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <Countries countries={countries} filter={filter} handleCountrySelection={handleCountrySelection} />
      </div>
    );
}

export default App;
