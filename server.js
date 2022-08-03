// Dependencies

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars Engine Object with help from the custom helper functions

const hbs = exphbs.create({ helpers: helpers });

// Tells Express that we're using the handlebar template engine

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Tells Express to use routes

app.use(routes);

// Syncs Sequelize and Starts Server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});