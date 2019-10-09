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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(note => {
        if (note) {
            res.json(note.toJSON())
        } else {
            res.status(404).end()
        }

    })
        .catch(error => next(error))
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

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
