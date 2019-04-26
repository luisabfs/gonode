const express = require('express');
const nunjucks = require('nunjucks');

// express config
const app = express();
app.use(express.urlencoded({ extended: false }));

// nunjucks config
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});
app.set('view engine', 'njk');

// middleware
const doesAgeExists = (req, res, next) => {
  if (!req.query.age) res.redirect('/');

  return next();
};

const checkUser = (age, res) => {
  if (age < 18) res.redirect(`/minor?age=${age}`);
  else res.redirect(`/major?age=${age}`);
};

app.get('/', (req, res) => res.render('form'));

app.post('/check', (req, res) => {
  checkUser(req.body.age, res);
});

app.get('/minor', doesAgeExists, (req, res) => {
  res.send(`Você é menor de idade e possui ${req.query.age} anos.`);
});

app.get('/major', doesAgeExists, (req, res) => {
  res.send(`Você é maior de idade e possui ${req.query.age} anos.`);
});

app.listen(3000);
