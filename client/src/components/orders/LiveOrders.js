import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getFirstOrder, getOrders } from "../../actions/order";
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
import { FiCheck, FiPlus, FiX } from "react-icons/fi";
import OrdersCard from "./OrdersCard";

let socket;
const CONNECTION_PORT = `http://127.0.0.1:5000/`;

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
    return () => {
      socket.disconnect();
    };
  },[order])

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
    socket.on("finished", (payload) => {
      setOrder([...payload]);
    });
    return () => {
      socket.disconnect();
    };
  }, [order]);

  const removeFirstOrder = () => {
    ws.finished();
  };
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Pending Orders
      </Text>
      {/* <Button colorScheme="blue" onClick={removeFirstOrder} mb="5">
        Attend
      </Button> */}
      <Flex flexWrap="wrap" justifyContent="space-between">
        {order?.length > 0
          ? order.map((item, idx) => {
              return <OrdersCard key={idx} order={item}/>
          })
          : "No existe ordenes"}
      </Flex>
    </Container>
  );
};
export default LiveOrders;
