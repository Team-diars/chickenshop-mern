const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');
const app = express();
const path = require("path");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(cors());

//* Connecting to Database
connectDB();

//* Init Middleware
app.use(express.json({ extended: false }));

//* Defining Routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/category',require('./routes/api/category'));
app.use('/api/contact',require('./routes/api/contact'));
app.use('/api/user',require('./routes/api/user'));
app.use('/api/sale',require('./routes/api/sale'));
app.use('/api/upload',require('./routes/api/upload'));
app.use('/api/ticket',require('./routes/api/ticket'));
app.use('/api/product',require('./routes/api/product'));
app.use('/api/employee',require('./routes/api/employee'));
app.use('/api/settings',require('./routes/api/settings'));
app.use('/api/client',require('./routes/api/client/auth'))
//app.use('/api/order',require('./routes/api/client/order'))
app.use('/api/menu',require('./routes/api/menu'))
app.use('/api/order',require('./routes/api/order'))

if (process.env.NODE_ENV === "production") {
  //* Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//* Handling 404 error
// app.use(notFound);
//* Handling custom errors
// app.use(errorHandler);

//Socket
// io.on('connection', (socket) => {
//   console.log('connected!!');
//   socket.on('event://send-order', (msg) => {
//     //const payload = JSON.parse(msg);
//     console.log('payload - backend: ',msg)
//   })
// })

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
