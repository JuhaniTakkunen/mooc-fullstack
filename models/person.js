const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const fs = require('fs');

function simpleReadFileSync(filePath)
{
    let options = {encoding:'utf-8', flag:'r'};
    let buffer = fs.readFileSync(filePath, options);
    return buffer
}

let password = simpleReadFileSync('./secret.txt')
const url = 'mongodb://' + password + '@ds243502.mlab.com:43502/takkunen'
mongoose.connect(url)
console.log(url)

const formatPerson = (person) => {
    const formattedPerson = { ...person._doc, id: person._id }
    delete formattedPerson._id
    delete formattedPerson.__v
    console.log("heeeeee")
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
    console.log("jepjep")
    console.log(foo)
    return formatPerson(foo)
  };

const Person = mongoose.model('Person', PersonSchema)


module.exports = Person
