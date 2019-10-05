const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        name: 'Seppo Seinähullu',
        number: '04519348567',
        id: 1
    },
    {
        name: 'Matti Meikäläinen',
        number: '0441609814',
        id: 2
    },
    {
        name: 'Aku Ankka',
        number: '0400404444',
        id: 3
    },
    {
        name: 'Matti Mallikas',
        number: '0501837485',
        id: 4
    }
]

const generateId = () => {
    const id = Math.floor((Math.random() * 100000) + 1);
    console.log(id)
    return id
}

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

})

app.get('/info', (req, res) => {
    res.send('Phonebook has info for ' + persons.length + ' people <br /><br />' + new Date())
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    console.log(req.body.number)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()

    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
