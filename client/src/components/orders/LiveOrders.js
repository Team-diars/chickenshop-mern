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
import OrderCard from "./OrderCard";

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
    // console.log("Updating Order: ",order);
    return () => {
      socket.disconnect();
    };
  }, [order]);

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
    //console.log("second effect!!");
    socket.on("finished", (payload) => {
      //console.log("payload: ", payload);
      setOrder([...payload]);
    });
    return () => {
      socket.disconnect();
    };
  }, [order]);

  const removeFirstOrder = () => {
    // console.log("finished")
    ws.finished();
  };
  console.log(order);
  // console.log("Updating Order: ", order);
  // const order_temp = [
  //   {
  //     id: "1111",
  //     date: "23 Feb 2021, 08:28pm",
  //     total: 40,
  //     status: "delivered",
  //     isDelivery: true,
  //     products: [
  //       {
  //         name: "torta helada 1",
  //         desc: "torta helada 1",
  //         price: 5,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada test@@@@",
  //         desc: "torta helada 1",
  //         price: 15,
  //         category: "dessert",
  //         qty: 3,
  //         creams: [],
  //       },
  //     ],
  //   },
  //   {
  //     id: "22222",
  //     date: "23 Feb 2021, 08:28pm",
  //     total: 20,
  //     status: "preparing",
  //     specialDelivery: true,
  //     products: [
  //       {
  //         name: "torta helada 2",
  //         desc: "torta helada 1",
  //         price: 7,
  //         category: "dessert",
  //         qty: 2,
  //         creams: [],
  //       },
  //     ],
  //   },
  //   {
  //     id: "33333",
  //     date: "23 Feb 2021, 08:28pm",
  //     total: 25,
  //     status: "delivered",
  //     specialDelivery: true,
  //     products: [
  //       {
  //         name: "torta helada 2",
  //         desc: "torta helada 1",
  //         price: 7,
  //         category: "dessert",
  //         qty: 2,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada 3",
  //         desc: "torta helada 1",
  //         price: 11,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //     ],
  //   },
  //   {
  //     id: "44444",
  //     date: "23 Feb 2021, 08:28pm",
  //     total: 33,
  //     status: "pending",
  //     specialDelivery: true,
  //     products: [
  //       {
  //         name: "torta helada 2",
  //         desc: "torta helada 1",
  //         price: 7,
  //         category: "dessert",
  //         qty: 2,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada 3",
  //         desc: "torta helada 1",
  //         price: 11,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada 3",
  //         desc: "torta helada 1",
  //         price: 11,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada 3",
  //         desc: "torta helada 1",
  //         price: 11,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //       {
  //         name: "torta helada 3",
  //         desc: "torta helada 1",
  //         price: 11,
  //         category: "dessert",
  //         qty: 1,
  //         creams: [],
  //       },
  //     ],
  //   },
  // ];
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Pedidos
      </Text>
      <Button colorScheme="blue" onClick={removeFirstOrder} mb="5">
        Attend
      </Button>
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
