import React from 'react'

const Filter = (props) => {
    return (
        <div>
            <h2>Search</h2>
            <input value={props.filter} onChange={props.handleFilterChange}/>
        </div>
    )
}

export default Filter