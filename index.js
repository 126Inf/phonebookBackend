const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(express.json());
const port = 3001;
let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    var date = new Date();

    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)

});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  let person = persons.find((person) => person.id === id);
  if(person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  let body = req.body;

  if(!body.name) {
    return res.status(400).json({
      error: "name missing"
    })
  }

  if(!body.number) {
    return res.status(400).json({
      error:"number missing"
    })
  }

  const newPerson = {
    id: persons.length + 1,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
