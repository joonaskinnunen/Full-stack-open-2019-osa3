require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :status :res[content-length] - :response-time ms :data'))
app.use(express.static('build'))

morgan.token('data', function (req, res) {
    return JSON.stringify(req.body);
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(note => {
        response.json(note.toJSON())
    })
})

app.get('/info', (req, res) => {

    res.send('Phonebook has info for people <br /><br />' + new Date())
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
