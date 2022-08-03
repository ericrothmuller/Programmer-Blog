// Dependencies

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars Engine Object with help from the custom helper functions

const hbs = exphbs.create({ helpers: helpers });

// Tells Express that we're using the handlebar template engine

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Cookies

const sess = {
    secret: "shdf92h3978h9872hre78dgi",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

  app.use(session(sess));

// Tells Express to use routes

app.use(routes);

// Syncs Sequelize and Starts Server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});