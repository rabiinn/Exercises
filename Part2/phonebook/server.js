import express from 'express'
import morgan from 'morgan'
const app = express()


app.use(express.json())
app.use(morgan('combined'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Artoo Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const len = persons.length;
const now = new Date();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
  

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info', (req, res) => {
    res.send(`<p> Phonebook has info for ${len} people <p>
        <p> ${now.toString()}`)
})

// get single entry based upon id
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    const person = persons.find( person => person.id === id)

    if(person){
        res.json(person);
    }
    else{
        res.status(404).end()
    }
})

// delete

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter( p => p.id !== id)
    res.status(204).end();
})

const generateId = () => {
    return Math.floor(Math.random() * 100);
}
app.post('/api/persons', (req, res) => {
    const person = req.body;

    if(!person || !person.name || !person.number ){
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if(persons.some(p => p.name === person.name)){
        return res.status(400).json({
            error: `The name ${person.name} already exists`
        })
    }

    const newPerson = { id: generateId(), ...person }
    persons = persons.concat(newPerson);
    res.json(newPerson);
})

const PORT = 3001

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('error', (error) => {
    console.error('Server error:', error);
});