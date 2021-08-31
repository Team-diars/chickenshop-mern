import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import {Box, Button, Grid} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getFirstOrder, getOrders } from '../../actions/order';
import styled from 'styled-components';

let socket;
const CONNECTION_PORT = `http://localhost:5000/`;
export const LiveOrders = () => {
  const [order, setOrder] = useState([]);
  const [isAttended, setIsAttended] = useState(false);
  const socketClientRef = useRef();

  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    socket.on('load-remaining-orders',(data) => {
      setOrder(o => [...o, ...JSON.parse(JSON.stringify(data))])
      console.log('retreving data: ',order)
    })
    return () => {
      //  socket.disconnect();
      // socket.off('load-remaining-orders',(data) => {
      //   setOrder([...order, ...JSON.parse(JSON.stringify(data))])
      // })
      socket.removeAllListeners();
    };
  },[])
  useEffect(() => {
    socket.on('send-order',(payload) => {
      setOrder([...order, JSON.parse(JSON.stringify(payload))])
    })
    return () => {
      console.log('clean up')
    };
  },[order])

  const handleState = (id) => {
    socket.emit('attend',id, (databack) => {
      console.log("databack: ",databack)
    });
  }
  return (
    <div>
      <h1>Live Orders</h1>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {
          (!order) ? <h1>Loading..</h1> : order.map((item,idx) => (
          <Box bg="tomato" w="100%">
            {JSON.stringify(item, null,1)}
            {
              (item.status === 1) ?
                <Button colorScheme="teal" onClick={() => handleState(item._id)}>Attend</Button>
              : (item.status === 2) ? <Button>Attending</Button> : <Button>Attend</Button> 
            }
            
          </Box>
          ))
        }
      </Grid>      
      {/* <Button>Atender</Button> */}
    </div>
  )
}

const CardWrapper = styled.div`
  
`;