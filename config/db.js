const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
  try {
    await mongoose.connect(db,{ 
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useFindAndModify: false }, (err, res) => {
        if (err) console.log(err)
        else 'connected';
    });
    console.log('Mongo connected!')
  } catch (err) {
    console.log(err.message)
    process.exit(1); //* Exit Proccess with failure (1), in other cases we use 0 to exit with success
  }
}

module.exports = connectDB;