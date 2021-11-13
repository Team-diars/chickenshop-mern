import React, { useContext } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Container,
  Text,
  Flex,
  Badge,
  useColorModeValue,
  useDisclosure,
  Icon,
  Circle,
  Image,
  Collapse,
} from "@chakra-ui/react";
import { FiCheck, FiX } from "react-icons/fi";

import { WebSocketContext } from "../../ws";
import io from "socket.io-client";

function OrdersCard(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
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
  if (props.order.status === Types.PENDING) {
    status = "gray";
    status_letter = "PENDIENTE";
  } else if (props.order.status === Types.VALIDATED) {
    status = "blue";
    status_letter = "ACEPTADO";
  } else if (props.order.status === Types.DELIVERED) {
    status = "green";
    status_letter = "ENTREGADO";
  }
  const handleChecked = (id) => {
    ws.checkOrder(id);
  };
  const handleUncheck = (id) => {
    ws.uncheckOrder(id);
  };
  return (
    <Box width={["full", "46%", "23%"]} mb="8" mx={["2%", "2%", "1%"]}>
      <Box
        // bg="gray.100"
        // flex="1"
        // width="full"
        borderWidth="1px"
        rounded="xl"
        shadow="lg"
        transition="all .2s ease-in"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p="4"
      >
        <Flex
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              marginBottom="1"
            >
              Pedido #{props.order._id.substring(0, 5)}
            </Text>
            <Text
              color="gray"
              fontSize="sm"
              fontWeight="semibold"
              lineHeight="tight"
              isTruncated
              marginBottom="10px"
            >
              {props.order.date}
            </Text>
          </Box>
          <Box d="flex" alignItems="baseline">
            <Circle
              size="20px"
              position="absolute"
              top={"-10px"}
              right={"-5px"}
              bg={`${status}.300`}
            />
            <Badge rounded="full" px="2" fontSize="sm" colorScheme={status}>
              {/* {props.order.status === 1 ? "Pendiente" : "Entregado"} */}
              {status_letter}
            </Badge>
          </Box>
        </Flex>
        {/* <Button size="sm" onClick={handleToggle}>
          +
        </Button>
        <Collapse startingHeight={150} in={show} animateOpacity> */}
        <Box
          px="2"
          height="150px"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "20px",
            },
          }}
        >
          {props.order.products?.length > 0 &&
            props.order.products.map((product, idx) => (
              <Flex justifyContent="space-between" pt="1" key={idx}>
                <Box w={1 / 3}>
                  <Image
                    rounded="full"
                    boxSize="50px"
                    objectFit="cover"
                    src={`https://via.placeholder.com/100`}
                    // src={`/images/${product.image}`}
                    alt={product.name + "-" + product.image}
                  />
                </Box>
                <Box w={2 / 3}>
                  <Flex flexDirection="column">
                    <Text
                      as="h5"
                      fontSize="sm"
                      fontWeight="semibold"
                      lineHeight="tight"
                      isTruncated
                    >
                      {product.name}
                    </Text>
                    <Text
                      color="gray"
                      fontSize="xs"
                      fontWeight="semibold"
                      lineHeight="tight"
                      isTruncated
                      marginBottom="5px"
                    >
                      {product.description}
                    </Text>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      fontSize="md"
                      fontWeight="semibold"
                    >
                      <Text
                        color="gray"
                        fontSize="xs"
                        fontWeight="semibold"
                        lineHeight="tight"
                        isTruncated
                        marginBottom="5px"
                      >
                        S/ {product.price?.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        lineHeight="tight"
                        isTruncated
                        marginBottom="5px"
                      >
                        Can: {product.quantity}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
        </Box>
        {/* </Collapse> */}

        <Box pt="4" width="full" borderTop="1px solid" borderColor="gray.200">
          <Flex justifyContent="space-between" alignItems="center">
            <Box fontSize="xl" fontWeight="semibold" color="blue.500">
              <Box as="span" color={"gray.600"} fontSize="md" mr="1">
                S/
              </Box>
              {props.order.total?.toFixed(2)}
            </Box>
            {props.order.status === 1 && (
              <Flex fontSize="xl" fontWeight="semibold">
                <Button
                  size="lg"
                  display={"flex"}
                  mr="2"
                  colorScheme="green"
                  onClick={() => handleChecked(props.order._id)}
                >
                  <Icon as={FiCheck} h={5} w={5} alignSelf={"center"} />
                </Button>
                <Button
                  size="lg"
                  display={"flex"}
                  colorScheme="red"
                  onClick={() => handleUncheck(props.order._id)}
                >
                  <Icon as={FiX} h={5} w={5} alignSelf={"center"} />
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default OrdersCard;