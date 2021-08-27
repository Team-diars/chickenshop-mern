import React, { useContext } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { addOrder } from '../../actions/order'
import { WebSocketContext } from '../../ws'
export const MenuScreen = () => {
  const data = useSelector(state => state.order)  
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  console.log("WS: ",ws);
  const sendPayload = () => {
    const payload = {
      products: [
        {
          "name": "alitas",
          "price": 5.5,
          "category": "Food",
          "qty": 5,
          "creams": [
            "mayonesa",
            "tartara"
          ]
        }
      ]
    };
    // dispatch(addOrder(payload))
    ws.sendOrder(payload);
  }
  return (
    <Button onClick={sendPayload}>
      Send
    </Button>
  )
}

const Button = styled.button`
  padding: 16px 32px;
  background-color: gainsboro;
`;