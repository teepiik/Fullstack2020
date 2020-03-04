import React, { useState } from 'react'
import {
    Route, Link, useRouteMatch, Switch, useHistory
} from "react-router-dom"
import { useField } from './hooks/index'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/anecdotes'>Anecdotes</Link>
            <Link style={padding} to='/create'>Create new</Link>
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => 
                <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>
            )}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)

const Notification = ({ notification }) => {
    if(notification === null) {
        return null
    }
    return (
        <div>{notification}</div>
    )
}

const Anecdote = (props) => {
    const anecdote = props.anecdote
    if(anecdote === null) {
        return(
            <p>didnt find</p>
        )
    }
    return (
        <div>
            <h3>{anecdote.content}</h3>
            <p>by {anecdote.author}</p>
            <p>has {anecdote.votes} votes</p>
            <p>{anecdote.info}</p>
            <button onClick={() => props.vote(anecdote.id)}>vote</button>
        </div>
    )
}

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.field.value,
            author: author.field.value,
            info: info.field.value,
            votes: 0
        })
        history.push('/')
    }

    const reset = () => {
        content.setEmpty()
        author.setEmpty()
        info.setEmpty()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.field} />
                </div>
                <div>
                    author
                    <input {...author.field} />
                </div>
                <div>
                    url for more info
                    <input {...info.field} />
                </div>
                <button>create</button>
            </form>
            <button onClick={() => reset()}>reset</button>
        </div>
    )
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
      {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: '1'
      },
      {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: '2'
      }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
      anecdote.id = (Math.random() * 10000).toFixed(0)
      setAnecdotes(anecdotes.concat(anecdote))
      setNotification(`You created ${anecdote.content}`)
          setTimeout(() => {
              setNotification(null)
          }, 10000)
    }

    const anecdoteById = (id) =>
      anecdotes.find(a => a.id === id)

    const vote = (id) => {
      const anecdote = anecdoteById(id)

      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const match = useRouteMatch('/anecdotes/:id')
    const anecdote = match 
        ? anecdotes.find(a => a.id == Number(match.params.id))
        : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={notification}/>
            <Switch>
                <Route path = '/anecdotes/:id' render={() => <Anecdote anecdote={anecdote} vote={vote} />} />
                <Route path = '/anecdotes' render={() => <AnecdoteList anecdotes={anecdotes} />} />
                <Route path = '/create' render={() => <CreateNew addNew={addNew} />} />
                <Route path = '/' render={() => <About />} />
            </Switch>
            <Footer />     
        </div>
    )
}

export default App;
