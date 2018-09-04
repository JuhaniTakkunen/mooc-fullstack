const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const fs = require('fs')

function simpleReadFileSync(filePath) {
  let options = { encoding: 'utf-8', flag: 'r' }
  let buffer = fs.readFileSync(filePath, options)
  return buffer
}


let password = simpleReadFileSync('secret.txt')
const url = 'mongodb://' + password + '@ds243502.mlab.com:43502/takkunen'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})


let args = process.argv.slice(2)
let name = args[0]
let phone = args[1]

if (name) {

  console.log('lisätään henkilö', name, 'numero', phone, 'luetteloon')

  const person = new Person({
    name: name,
    number: phone
  })

  person
    .save()
    .then(response => {
      console.log('Person saved!', response)
      mongoose.connection.close()
    })
} else {
  console.log('Haetaan kaikki tiedot... \n ')
  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo:')
      result.forEach(persons => {
        console.log(persons['name'], persons['number'])
      })
      mongoose.connection.close()
    })
    .catch(res => {
      console.log('outo firhe tapahtui')
      console.log(res)
    })
}