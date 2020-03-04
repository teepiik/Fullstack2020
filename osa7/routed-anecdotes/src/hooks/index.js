import { useState } from 'react'

export const useField = type => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const setEmpty = () => {
        setValue('')
    }

    return {
        setEmpty: setEmpty,
        field: { type, value, onChange }
    }
}