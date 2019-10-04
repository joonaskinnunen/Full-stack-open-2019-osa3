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
      const maxId = notes.length > 0 ? Math.max(notes.map(x => x.id))
      : 0
      return maxId + 1
  }

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    person ? res.json(person) : res.status(404).end()
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send('Phonebook has info for ' + persons.length + ' people <br /><br />' + new Date())
})


app.delete('/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/persons', (req, res) => {
if(!res.body) {
    return res.status(400).json({
        error:'content missing'
    })
}
    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()

    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
