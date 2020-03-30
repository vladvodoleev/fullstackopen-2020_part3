const mongoose = require('mongoose')

const args = process.argv

if (args < 3 || args === 4 || args > 5) {
  console.log('incorrect arguments')
  process.exit(1)
}

const password = args[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-iulpt.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if (args.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person =>
      console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else if (args.length === 5) {
  const name = args[3]
  const number = args[4]
  const newPerson = new Person({ name, number })
  newPerson.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}