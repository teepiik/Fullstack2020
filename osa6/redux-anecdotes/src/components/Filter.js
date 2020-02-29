import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <p>Search</p>
            <input onChange={(event) => dispatch(filterChange(event.target.value))}/>
        </div>
    )
}

export default Filter