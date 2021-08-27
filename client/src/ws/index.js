/* eslint-disable import/no-anonymous-default-export */
import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addOrder } from '../actions/order';

export const WebSocketContext = createContext(null);
export default function({children}){
  let socket;
  let ws;
  const dispatch = useDispatch();
  const sendOrder = (payload) => {
    socket.emit("event://send-order", JSON.stringify(payload));
    dispatch(addOrder(payload));
  }
  if(!socket){
    socket = io.connect('http://localhost:5000/api/order');
    socket.on("event://send-order", (data) => {
      // const payload = JSON.parse(data);
      // dispatch(addOrder(payload));
      console.log('SENT ORDER!!!!')
    })
    ws = {
      socket: socket,
      sendOrder
    }
  }
  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}