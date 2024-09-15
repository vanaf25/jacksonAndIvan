const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DATABASE_DEV=mongodb://<user>:<password>@localhost:27017/database_name
 * DATABASE_PROD=<your production database string>
 */

const devConnection = process.env.DATABASE_DEV;
const prodConnection = process.env.DATABASE_PROD;

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(prodConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database connected...'))
    .catch((error) => console.error('Database connection failed:', error.message));
} else {
  mongoose
    .connect(prodConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database connected...'))
    .catch((error) => console.error('Database connection failed:', error.message));
}
