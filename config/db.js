const Datastore = require('nedb');

const connectDB = async () => {
  try {
    const db = new Datastore({ filename: 'database.db', autoload: true });

    console.log('NeDB Connected');
    
    return db;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;