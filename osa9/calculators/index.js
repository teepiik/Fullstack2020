const express = require('express')
const app = express()
app.use(express.json())
const { calculateBmi } = require('./calculateBmi')
const { calculateExercises } = require('./calculateExercises')

app.get('/hello', (req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const weight = req.query.weight
    const height = req.query.height
    res.send(calculateBmi(height, weight))
})

app.post('/exercises', (req, res) => {
    const body = req.body;
    const { hours } = body;
    const { target } = body;
    res.send(calculateExercises(hours, target))
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})