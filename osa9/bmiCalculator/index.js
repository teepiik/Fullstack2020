const express = require('express')
const app = express()
const { calculateBmi } = require('./calculateBmi')

app.get('/hello', (req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const weight = req.query.weight
    const height = req.query.height
    res.send(calculateBmi(height, weight))
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})