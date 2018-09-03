const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(cors())

app.use(bodyParser.json())

morgan.token('_data', function getData (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :_data :status :res[content-length] - :response-time ms '))
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]



app.get('/', (req, res) => {
    res.send('<h1>Frontend is probably broken</h1>')
})

app.get('/info', (req, res) => {
    let full_message = 'Puhelinluettelossa on ' + persons.length + ' henkilön tiedot';
    full_message += '<br /> date: ' + Date();

    let full_page = '<h1>Info page</h1><body>' + full_message + '</body>';
    res.send(full_page);

})

app.get('/api/persons', (request, response) => {
    console.log("here we go")
    Person
        .find({})
        .then(persons => {
                response.json(persons.map(Person.format))
        })
        .catch(error => {
            console.log("unexpected error: ", error);
            response.status(500).end()
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .find({})
        .then(result => {
            console.log("puhelinluettelo:")
            result.forEach(persons => {
                console.log(persons["name"], persons["number"])
            })
            mongoose.connection.close()
        })
        .catch(error => {
            console.log("unexpected error: ", error);
            response.status(500).end()
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {  // NOTE! Allows whitespace, maybe increase restrictions?
        return response.status(400).json({error: 'missing name'})
    }
    if (!body.number) {  // NOTE! Allows all characters, maybe increase restrictions?
        return response.status(400).json({error: 'missing number'})
    }
    if (persons.find(p => p.name === body.name)){
        // status code 400 chosen from SO: https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        return response.status(400).json({error: 'duplicate user name'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(Person.format(savedPerson))
        })
        .catch(error => {
            console.log("unexpected error: ", error);
            response.status(500).end()
        })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});