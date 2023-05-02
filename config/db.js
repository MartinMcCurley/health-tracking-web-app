const Datastore = require('nedb');

const connectDB = async () => {
  try {
    const db = new Datastore({ filename: 'database.db', autoload: true });

    console.log('NeDB Connected');
    
    // Make the database instance available through module exports
    module.exports = db;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();