import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import {Button} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getFirstOrder, getOrders } from '../../actions/order';
let socket;
const CONNECTION_PORT = `http://localhost:5000/`;
export const LiveOrders = () => {
  const [order, setOrder] = useState([]);
  const [first, setFirst] = useState(null);
  const dispatch = useDispatch();
  const {orders, loading} = useSelector(state => state.order);
  console.log("remaining_orders: ",{orders, loading})
  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    if(!loading && orders) {
      console.log('not loading!')
      setOrder([...order, orders]);
    }
    socket.on('send-order',(data) => {
      setOrder([...order,...orders, JSON.parse(data)])
    })
    return () => {
      socket.disconnect()
    };
  },[orders])

  useEffect(() => {
    const _getOrders = () => dispatch(getOrders());
    _getOrders();
  },[dispatch])

  console.log("Orders: ",order)
  // console.log("First: ",firstOrder.order)
  return (
    <div>
      <h1>Live Orders</h1>
      {
        (loading) ? <h1>Loading...</h1> : 
        order.map((item,idx) => (
          <pre>
            {idx}: {JSON.stringify(item, null, 2)}
          </pre>
        ))
      }
      <Button>Atender</Button>
    </div>
  )
}
