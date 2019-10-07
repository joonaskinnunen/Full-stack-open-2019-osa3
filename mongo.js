const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://joonaskinnunen:${password}@cluster0-zq4nt.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Note = mongoose.model('Note', noteSchema)

if(process.argv.length === 3) {
Note.find({

})
.then(x => {
    console.log('phonebook:')
    x.map(x => console.log(x.name + ' ' + x.number))
    mongoose.connection.close();
})
}

const note = new Note({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length === 5) {

note.save().then(response => {
  console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook');
  mongoose.connection.close();
})
}