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
import { FiCheck, FiPlus, FiX } from "react-icons/fi";
import OrderCard from "./OrderCard";

import { WebSocketContext } from "../../ws";
let socket;
const CONNECTION_PORT = `http://127.0.0.1:5000/`;

export const LiveOrders = () => {
  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
    socket.on("retrieve-remaining-orders", (payload) => {
      if (payload) setOrder([...order, ...JSON.parse(JSON.stringify(payload))]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
    socket.on("send-order", (payload) => {
      setOrder([...order, JSON.parse(JSON.stringify(payload))]);
    });
    return () => {
      socket.disconnect();
    };
  }, [order]);

  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Pending Orders
      </Text>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {order?.length > 0
          ? order.map((item, idx) => {
              console.log(item);
              return <OrderCard key={idx} order={item} />;
            })
          : "No existen pedidos"}
      </Flex>
    </Container>
  );
};
export default LiveOrders;
