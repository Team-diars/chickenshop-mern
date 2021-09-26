/* eslint-disable import/no-anonymous-default-export */
import React, {
  createContext
} from "react";
import io from "socket.io-client";

export const WebSocketContext = createContext(null);
export default function ({
  children
}) {
  let socket;
  let ws;
  const CONNECTION_PORT = `http://127.0.0.1:5000/`;
  const sendOrder = (payload) => {
    console.log("payload-index.js: ",payload);
    socket.emit("send-order", JSON.stringify(payload), (payload_from_server) => {
        //Here we're going to return the payload in order to show the receipt or order that they sent
        // console.log(payload_from_server)
      }
    );
    // dispatch(addOrder(payload));
  };
  const finished = () => {
    socket.emit("finished", (payload) => {
      JSON.stringify(payload);
    })
  }
  if (!socket) {
    socket = io(CONNECTION_PORT, {
      transports: ["websocket"]
    });
    socket.on("send-order", (data) => {
      // const payload = JSON.parse(data);
      // dispatch(addOrder(payload));
      // console.log("DATA: ",data)
    });
    ws = {
      socket: socket,
      sendOrder,
      finished,
    };
  }
  return ( <WebSocketContext.Provider value = {ws} > 
      {children} 
    </WebSocketContext.Provider>
  );
}