import React from 'react'

const Course = ({course}) =>{
    return (
        <div> 
            <Header header={course.name}/>
            <Content parts={course.parts} />
        </div>

    )
}

const Header = ({header}) =>{
    return (
        <h2>{header}</h2>
    )
}

const Content = ({parts}) =>{
    const total = parts.reduce((total, {exercises}) => total + exercises, 0)

    const rows = () =>
        parts.map(part => <li key={part.id} >{part.name}, {part.exercises}</li>)

    return (
        <div>
            <ul>
                {rows()}
            </ul>
            <p>Total exercises: {total}</p>
        </div>
    )
}

export default Course