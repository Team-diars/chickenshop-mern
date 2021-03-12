const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
//* Connecting to Database
connectDB();

//* Init Middleware
app.use(express.json({extended:false}));

//* Defining Routes
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/sale',require('./routes/api/sale'));
app.use('/api/ticket',require('./routes/api/ticket'));
app.use('/api/product',require('./routes/api/product'));
app.use('/api/employee',require('./routes/api/employee'));
app.use('/api/category',require('./routes/api/category'));

if (process.env.NODE_ENV === 'production'){
  //* Set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));