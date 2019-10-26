import React, { useState } from 'react'
import ReactDOM from 'react-dom';
//import './index.css';

const Feedback = (props) => {
    return (
        // add buttons
        <div>
            <h2>Give feedback</h2>
            <Button onClick={props.handleGoodVote} label="Good" />
            <Button onClick={props.handleNeutralVote} label="Neutral" />
            <Button onClick={props.handleBadVote} label="Bad" />
        </div>
    )
}

const Button = (props) => {      
    return (
        <button onClick={props.onClick}> {props.label} </button>
    )
}

const Statistics = (props) => {
    const totalVotes = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / totalVotes
    const positive = props.good / totalVotes

    if(totalVotes == 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <p>No votes given yet!</p>
            </div>
        )
    }

        // TODO MAKE A TABLE 
    return (
        <div>
            <h2>Statistics</h2>
            <Statistic label="Good" stat={props.good}/>
            <Statistic label="Neutral" stat={props.neutral}/>
            <Statistic label="Bad" stat={props.bad}/>
            <Statistic label="All" stat={totalVotes}/>
            <Statistic label="Average" stat={average}/>
            <Statistic label="Positive" stat={positive}/>
        </div>
    )
}

const Statistic = (props) => {      
    return (
        <p>{props.label}: {props.stat}</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodVote = () => {
        setGood(good + 1)
    }

    const handleNeutralVote = () => {
        setNeutral(neutral + 1)
    }

    const handleBadVote = () => {
        setBad(bad + 1)
    }

    return ( 
    <div>
        <Feedback handleGoodVote={handleGoodVote} handleNeutralVote={handleNeutralVote} handleBadVote={handleBadVote}/> 
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>      
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


