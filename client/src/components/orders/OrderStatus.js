import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Text,
  Circle,
  Button,
  ButtonGroup,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { FiArchive } from "react-icons/fi";
import io from "socket.io-client";
import { WebSocketContext } from "./../../ws";
import OrderCard from "./../../components/orders/OrderCard";

let socket;
const CONNECTION_PORT = `http://127.0.0.1:5000/`;

export default function OrderStatus() {
  const initialFocusRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);
  const Types = {
    PENDING: 1,
    VALIDATED: 2,
    DELIVERED: 3,
  };
  //1 == Pending
  //2 == Validated
  //3 == Delivered
  let status;
  let status_letter;
  // if (props.order.status === Types.PENDING) {
  //   status = "gray";
  //   status_letter = "PENDIENTE";
  // } else if (props.order.status === Types.VALIDATED) {
  //   status = "blue";
  //   status_letter = "ACEPTADO";
  // } else if (props.order.status === Types.DELIVERED) {
  //   status = "green";
  //   status_letter = "ENTREGADO";
  // }
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
    <Box
      position="relative"
      margin="auto"
      maxWidth="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="sm"
      p="4"
      mt="3"
      mb="6"
    >
      <Box
        w="10"
        h="10"
        position="absolute"
        top={"-20px"}
        left={"45%"}
        // marginLeft={"55%"}
        translateX={"-50%"}
        backgroundColor="gray.200"
        borderRadius="full"
        display="flex"
        justifyContent="center"
      >
        <Icon as={FiArchive} h={5} w={5} alignSelf={"center"} />
      </Box>
      <Text fontSize="xl" fontWeight="bold" lineHeight="short" marginBottom="3">
        Tus pedidos
      </Text>
      <Box display="flex" flexDirection="column">
        {order?.length > 0
          ? order.map((item, idx) => (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                key={item._id}
              >
                <Badge variant="outline" colorScheme="green">
                  {item.status}
                </Badge>
                <Box ml="2">Pedido #{item._id.substring(0, 5)}</Box>
              </Box>
            ))
          : "No existen pedidos"}
      </Box>
    </Box>
  );
}
