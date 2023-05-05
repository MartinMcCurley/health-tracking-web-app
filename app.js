const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const Datastore = require('nedb');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const NedbStore = require('connect-nedb-session')(session);
const { attachUser } = require('./middleware/auth');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Set up NeDB
const dbPath = path.join(__dirname, 'goals.db');
const db = new Datastore({ filename: dbPath, autoload: true });
app.set('db', db);

// Pass the db instance to the routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new NedbStore({ filename: 'sessions.db' }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(attachUser);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', authRoutes);
app.use('/goals', require('./routes/goals'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));