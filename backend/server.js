const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/config/config.env' });
const connectDatabase = require('./config/database');
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});


dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();


const server = app.listen(process.env.PORT, () => {
  console.log('Server is running on port http://localhost:' + process.env.PORT);
})


// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});