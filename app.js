const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const Datastore = require('nedb');
const path = require('path');
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' });

const app = express();

// Logging
if(process.env.NODE_ENV === 'development') { 
  app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

// Set up NeDB
const dbPath = path.join(__dirname, 'database1.db');
const db = new Datastore({ filename: dbPath, autoload: true });

// Example: Insert a document into NeDB
const doc = { exampleField: 'Example value' };
db.insert(doc, (err, newDoc) => {
  if (err) console.error(err);
  console.log('Inserted document:', newDoc);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
