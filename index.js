const express = require('express');

const countriesRouter = require('./routes/countriesRoutes.js');

const { body, validationResult } = require('express-validator');
const Data = require('./countryList.js');
const PORT = 8000;

const app = express();
app.use(express.json());

app.use('/', countriesRouter);

// GET test landing page
app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
