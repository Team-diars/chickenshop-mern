import React, {useContext, useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {
  Box,
  Button,
  Grid,
  Container,
  Text,
  Flex,
  Badge,
  useColorModeValue,
  Icon,
  Circle,
} from "@chakra-ui/react";
import { WebSocketContext } from "../../ws";
import OrdersCard from "./OrdersCard";
let socket;
const CONNECTION_PORT = `http://127.0.0.1:5000/`;
export const LiveOrdersKitchen = () => {
  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);
  useEffect(() => {
    socket = io(CONNECTION_PORT, {transports: ['websocket']});
    socket.on('retrieve-validated-orders',(payload) => {
      if(payload) setOrder([...order, ...JSON.parse(JSON.stringify(payload))])
    })
    return () => {
      socket.disconnect();
    }
  },[])
  const removeFirstOrder = () => {
    ws.finished();
  };
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Orders
      </Text>
      <Button colorScheme="blue" onClick={removeFirstOrder} mb="5">
        Attend
      </Button>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {order?.length > 0
          ? order.map((item, idx) => {
              return <OrdersCard key={idx} order={item}/>
          })
          : "No hay ordenes"}
      </Flex>
    </Container>
  )
}