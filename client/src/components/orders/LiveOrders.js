import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
let socket;
const CONNECTION_PORT = `http://localhost:5000/`;
export const LiveOrders = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    socket.on('send-order',(data) => {
      setOrder([...order, JSON.parse(data)])
    })
    return () => socket.disconnect();
  },[order])
  console.log("Orders: ",order)
  return (
    <div>
      <h1>Live Orders</h1>
      
    </div>
  )
}
