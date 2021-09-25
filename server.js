const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');
const app = express();
const path = require("path");
const Order = require('./models/Order');
// const http = require('http').createServer(app);
const socket = require('socket.io');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
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
app.use(notFound);
//* Handling custom errors
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

//Socket
io = socket(server);
io.on('connection', async(socket) => {
  console.log('connected server: ', socket.id)
  socket.emit('retrieve-remaining-orders', await Order.find({ status: 1 }).exec());
  socket.on('finished', async () => {
    try{
      const orders = await Order.find({ status: {$ne: 0} }).exec();
      console.log("orders: ",orders);
      if(orders.length > 0){
        await Order.findByIdAndUpdate(orders[0]._id, { status: 0 }, { new: true });
        // console.log(orders);
        socket.broadcast.emit('finished', await Order.find({ status: {$ne: 0} }).exec())
      }
      // callback(orders);
    }catch(err){
      console.log(err)
    }
  })

  socket.on('send-order', async (msg, callback) => {
    try{
      console.log("data to save: ",JSON.parse(msg));
      const newOrder = new Order(JSON.parse(msg));
      await newOrder.save();
      //redirects to client components who are being connected to sockets
      callback(newOrder);
      socket.broadcast.emit('send-order',newOrder);
    }catch(err){
      console.log(err);
    }
  })  
  io.on('disconnect', () => {
    console.log('disconnected!');
  })
})