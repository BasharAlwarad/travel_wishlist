const express = require('express');
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
  const { sort } = req.query;
  if (sort === 'true') allCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
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
app.post('/api/countries', (req, res) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  const newCountry = {
    id: Data.length,
    name,
    alpha2Code,
    alpha3Code,
  };
  Data.push(newCountry);
  res.json(Data);
});

// PUT country by code
app.put('/api/countries/:code', (req, res) => {
  const { code } = req.params;
  code.toUpperCase();
  const { name, alpha2Code, alpha3Code } = req.body;
  const index = Data.findIndex(
    (e) => e.alpha2Code === code || e.alpha3Code === code
  );
  if (index === -1) return res.send(`Error Country code not found!`);
  Data[index].name = name;
  Data[index].alpha2Code = alpha2Code;
  Data[index].alpha3Code = alpha3Code;
  res.json(Data);
});

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
