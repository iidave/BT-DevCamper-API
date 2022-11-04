const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load ENV Vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

//Route files - where all routes are predetermined
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware that post to Console Method, folder location, response code and time it took in Dev mode only
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers - populates url with default values. Change this to make global change to routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close Server and exit process
  server.close(() => process.exit(1));
});