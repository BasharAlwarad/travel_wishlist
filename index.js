const express = require('express');
const { body, validationResult } = require('express-validator');
const Data = require('./countryList.js');
const PORT = 8000;

const app = express();
app.use(express.json());

// GET test landing page
app.get('/', (req, res) => {
  res.json('Hello World');
});

// GET all countries
app.get('/api/countries', (req, res) => {
  let allCountries = Data;
  const { sort, visited } = req.query;
  if (sort === 'true') allCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
  if (visited === 'true') {
    const visitedCountries = allCountries.filter((el) => el.visited === true);
    allCountries = visitedCountries;
  }
  res.json(allCountries);
});

// GET one country by code
app.get('/api/countries/:code', (req, res) => {
  const { code } = req.params;
  code.toUpperCase();
  const country = Data.find(
    (e) => e.alpha2Code === code || e.alpha3Code === code
  );
  if (!country) return res.send(`Error Country code not found!`);
  res.json(country);
});

// POST Country
app.post(
  '/api/countries',
  [
    body('name').notEmpty().isString(),
    body('alpha2Code').notEmpty().isString().isLength({ min: 2, max: 2 }),
    body('alpha3Code').notEmpty().isString().isLength({ min: 3, max: 3 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, alpha2Code, alpha3Code } = req.body;
    const newCountry = {
      id: Data.length,
      name,
      alpha2Code,
      alpha3Code,
      visited: false,
    };
    Data.push(newCountry);
    res.json(Data);
  }
);

// PUT country by code
app.put(
  '/api/countries/:code',
  [
    body('name').notEmpty().isString(),
    body('alpha2Code').notEmpty().isString().isLength({ min: 2, max: 2 }),
    body('alpha3Code').notEmpty().isString().isLength({ min: 3, max: 3 }),
    body('visited').isBoolean(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code } = req.params;
    code.toUpperCase();
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    const index = Data.findIndex(
      (e) => e.alpha2Code === code || e.alpha3Code === code
    );

    if (index === -1) return res.send(`Error Country code not found!`);

    Data[index].name = name;
    Data[index].alpha2Code = alpha2Code;
    Data[index].alpha3Code = alpha3Code;
    Data[index].visited = visited;

    res.json(Data);
  }
);

// DELETE country by code
app.delete('/api/countries/:code', (req, res) => {
  const { code } = req.params;
  code.toUpperCase();
  const index = Data.findIndex(
    (e) => e.alpha2Code === code || e.alpha3Code === code
  );
  if (index === -1) return res.send(`Error Country code not found!`);
  Data.splice(index, 1);
  res.json(Data);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
