import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './models/person.js'

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const now = new Date();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
  

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req, res) => {
    let len; 
    Person.find({}).then(result => {
        len = result.length;
         res.send(`<p> Phonebook has info for ${len} people <p>
        <p> ${now.toString()}`)
    })
   
})

// get single entry based upon id
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then( person => {
        if(person){
            res.json(person)
        }
        else {
            res.status(404).end();
        }
    }).catch(error => next(error))
})

// delete

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then( result => {
        res.status(204).end();
        console.log(result)
    })
})


app.post('/api/persons', (req, res) => {
    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        res.json(result);
        console.log(`${person.name} saved, number: ${person.number}`);
    }).catch(error => {
        next(error);
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body;
    if(!name || !number){
        return response.status(400).json({
            error:"content missing"
        })
    }
    Person.findById(request.params.id).then(person => {
        if(!person){
           return response.status(404).end()
        }
        person.name = name;
        person.number = number;

        person.save().then( updatedPeson => {
            response.json(updatedPeson);
        })
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if(error.name === 'ValidationError'){
    return response.status(400).send({error: error.message});
  }

  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('error', (error) => {
    console.error('Server error:', error);
});