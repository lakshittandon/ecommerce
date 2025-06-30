const mongoose = require('mongoose')

module.exports = function connectDatabase() {
  return mongoose.connect(process.env.DB_URI /*, no options needed */ )
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err)
      process.exit(1)
    })
}
