// Load express module:
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Load knex and database:
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// Configuration:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

// Routing:
app.get('/', (request, response) => {
  response.send('Hello, Publications');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


// Papers Query:
app.get('/api/v1/papers', (request, response) => {
  database('papers').select()
    .then((papers) => {
      response.status(200).json(papers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});
