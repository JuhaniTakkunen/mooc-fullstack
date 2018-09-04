const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}


const url = process.env.MONGODB_URI

mongoose.connect(url)
console.log(url)

const formatPerson = (person) => {
  const formattedPerson = { ...person._doc, id: person._id }
  delete formattedPerson._id
  delete formattedPerson.__v
  console.log('heeeeee')
  console.log(formattedPerson)
  return formattedPerson
}

const PersonSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  }
)

PersonSchema.statics.format = function(foo) {
  console.log('jepjep')
  console.log(foo)
  return formatPerson(foo)
}

const Person = mongoose.model('Person', PersonSchema)


module.exports = Person
