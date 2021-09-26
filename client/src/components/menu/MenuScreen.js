import React, { useContext, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { WebSocketContext } from '../../ws'

export const MenuScreen = () => {
  const ws = useContext(WebSocketContext);
  const sendPayload = () => {
    const payload =  [
        {
          total: 20,
          status: 1,
          specialDelivery: true,
          products: [
            {
              name: "torta helada 2",
              desc: "torta helada 1",
              price: 7,
              category: "dessert",
              qty: 2,
              creams: [],
            },
            {
              name: "torta helada 2",
              desc: "torta helada 1",
              price: 7,
              category: "dessert",
              qty: 2,
              creams: [],
            },
          ],
        },
      ];
    console.log('sent!');
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