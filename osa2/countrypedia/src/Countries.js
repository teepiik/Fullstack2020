import React from 'react'
// huom case jossa ei yhtään matchiä
// case sensitivity

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag" width="150" height="100"></img>
        </div>
    )
}

const Countries = (props) => {
    const filteredCountries = props.countries.filter(country => country.name.includes(props.filter))

    if(filteredCountries.length === 0) {
        return (
            <div>
                <p>No matches</p>
            </div>
        )
    }
    
    if(filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches to show.</p>
            </div>
        )
    } else if(filteredCountries.length < 11 && filteredCountries.length > 1) {
        return (
            <div>
                <ul>
                    {filteredCountries.map(country => <li key={country.name}>{country.name} 
                     <button onClick={(event) => {props.handleCountrySelection(country.name)}}>show</button></li>)}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <Country country={filteredCountries[0]} />
            </div>
        )
    }
}

export default Countries