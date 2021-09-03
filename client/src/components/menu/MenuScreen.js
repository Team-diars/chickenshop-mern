import React, { useContext, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { addOrder } from '../../actions/order'
import { WebSocketContext } from '../../ws'
import io from 'socket.io-client';

let socket;
const CONNECTION_PORT = `http://localhost:5000/`;
export const MenuScreen = () => {
  const data = useSelector(state => state.order)  
  console.log("data: ",data)
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const sendPayload = () => {
    const payload =  [
        {
          "name": "torta helada test@@@@",
          "price": 5,
          "category": "dessert",
          "qty": 1,
          "creams": [
          ]
        }
      ];
    // This will handle adding the order
    ws.sendOrder(payload);
  }
  return (
    <Button onClick={sendPayload}>
      Send Order
    </Button>
  )
}

const Button = styled.button`
  padding: 16px 32px;
  background-color: gainsboro;
`;