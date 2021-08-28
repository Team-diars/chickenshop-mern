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
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  // console.log("WS: ",ws);
  // useEffect(() => {
  //   socket = io(CONNECTION_PORT, {transports: ['websocket']});
  // },[CONNECTION_PORT])
  const sendPayload = () => {
    const payload = {
      products: [
        {
          "name": "helado 1LT",
          "price": 12,
          "category": "Icecream",
          "qty": 2,
          "creams": [
          ]
        }
      ]
    };
    // socket.emit('send-order', payload, (data) => {
    //   console.log(data)  
    // })
    // dispatch(addOrder(payload))
    
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