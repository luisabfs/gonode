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

const checkUser = (age, res) => {
  if (age < 18) res.redirect(`/minor?age=${age}`);
  else res.redirect(`/major?age=${age}`);
};

app.get('/', (req, res) => res.render('form'));

app.post('/check', (req, res) => {
  checkUser(req.body.age, res);
});

app.get('/minor', (req, res) => {
  const minor = 'menor';
  const major = 'maior';
  console.log(req.body.age);
  return req.body.age < 18 ? res.render('page', { minor }) : res.render('page', { major });
});

app.listen(3000);
