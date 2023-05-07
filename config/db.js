// Import required packages
const Datastore = require('nedb');

// Function to connect to NeDB database
const connectDB = async () => {
  try {
    // Create or load database file
    const db = new Datastore({ filename: 'database.db', autoload: true });

    // Log successful connection
    console.log('NeDB Connected');
    
    // Return database connection
    return db;
  } catch (err) {
    // Log error and exit process
    console.error(err);
    process.exit(1);
  }
};

// Export the database connection function
module.exports = connectDB;
