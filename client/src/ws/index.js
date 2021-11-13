/* eslint-disable import/no-anonymous-default-export */
import React, { createContext,useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { addOrder } from "../actions/order";

export const WebSocketContext = createContext(null);
export default function ({ children }) {
  let socket;
  let ws;
  const CONNECTION_PORT = `http://127.0.0.1:5000/`;
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  const sendOrder = (payload) => {
    console.log("payload-index.js: ", payload);
    socket.emit(
      "send-order",
      JSON.stringify(payload),
      (payload_from_server) => {
        //Here we're going to return the payload in order to show the receipt or order that they sent
        // console.log("Your order is being prepared: ",payload_from_server)
        setResponse("Your order is being prepared");
        // return payload_from_server;
      }
    );
    dispatch(addOrder(payload[0]));
  };
  const finished = () => {
    socket.emit("finished", (payload) => {
      JSON.stringify(payload);
    });
  };
  const checkOrder = (id) => {
    socket.emit("check-order", id);
  };
  const uncheckOrder = (id) => {
    socket.emit("uncheck-order", id);
  };
  if (!socket) {
    socket = io(CONNECTION_PORT, {
      transports: ["websocket"],
    });
    ws = {
      socket: socket,
      sendOrder,
      finished,
      checkOrder,
      uncheckOrder,
    };
  }
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}
