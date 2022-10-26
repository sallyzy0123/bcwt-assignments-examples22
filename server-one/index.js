'use strict';

const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

let requestCounter = 0;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.get('/catinfo', (req, res) => {
    const cat = {
        name: "Frank the cat",
        birthdate: "2010-12-01",
        weight: 19,
      };
    res.json(cat);
});

app.get('/test', (request, response) => {
    console.log('Someone is trying to test me.');
    requestCounter++;
    response.send('<h1>TEXT page</h1><p>' + requestCounter + '<p>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});