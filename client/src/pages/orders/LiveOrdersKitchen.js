import React, { useContext, useEffect, useRef, useState } from "react";
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
import OrderCard from "./../../components/orders/OrderCard";
let socket;
const CONNECTION_PORT = `http://127.0.0.1:5000/`;
export const LiveOrdersKitchen = () => {
  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);
  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
    socket.on("retrieve-validated-orders", (payload) => {
      if (payload) setOrder([...order, ...JSON.parse(JSON.stringify(payload))]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
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
      <Text fontSize="2xl" fontWeight="bold" marginBottom="10">
        Pedidos (Cocina)
      </Text>
      <Button colorScheme="blue" onClick={removeFirstOrder} mb="5">
        Attend
      </Button>
      <Flex w="full" flexWrap="wrap">
        {order?.length > 0
          ? order.map((item, idx) => {
              return <OrderCard key={item._id} order={item} />;
            })
          : "No existen pedidos"}
      </Flex>
    </Container>
  );
};
