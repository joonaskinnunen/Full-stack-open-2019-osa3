const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({
  })
    .then(x => {
      console.log('phonebook:')
      x.map(x => console.log(x.name + ' ' + x.number))
      mongoose.connection.close()
    })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length === 5) {

  person.save().then(response => {
    console.log(response)
    console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook')
    mongoose.connection.close()
  })
}