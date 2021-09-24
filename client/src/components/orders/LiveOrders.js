import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import {Box, Button, Grid} from '@chakra-ui/react'
import styled from 'styled-components';
import { WebSocketContext } from '../../ws'

let socket;
const CONNECTION_PORT = `http://localhost:5000/`;
export const LiveOrders = () => {
  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    socket.on('retrieve-remaining-orders',(payload) => {
      if(payload) setOrder([...order, ...JSON.parse(JSON.stringify(payload))])
    })
    return () => {
      socket.disconnect();
    }
  },[])

  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    socket.on('send-order',(payload) => {
      setOrder([...order, JSON.parse(JSON.stringify(payload))])
    })
    console.log("Updating Order: ",order);
    return () => {
      socket.disconnect();
    };
  },[order])

  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    console.log('second effect!!');
    socket.on('finished',(payload) => {
      console.log("payload: ",payload)
      setOrder([...payload])
    })
    return () => {
      socket.disconnect();
    }
  },[order])

  const removeFirstOrder = () => {
    // console.log("finished")
    ws.finished();
  }
  return (
    <div>
      <h1>Live Orders</h1>
      <Button colorScheme="blue" onClick={removeFirstOrder}>Attend</Button>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {
          (!order) ? <h1>Loading..</h1> : order.map((item,idx) => (
          <Box bg="tomato" w="100%">
            {JSON.stringify(item, null,1)}
          </Box>
          ))
        }
      </Grid>      
      {/* <Button>Atender</Button> */}
    </div>
  )
}