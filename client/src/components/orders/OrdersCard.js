import React from "react";
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
function OrdersCard(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  console.log("Order:", props);
  //1 == Pending
  //2 == Delivered
  let status = props.order.status === 1 ? "blue" : "green";
  return (
    <Flex
      width={{
        base: "100%", // 0-48em
        md: "48%", // 48em-80em,
        xl: "23%", // 80em+
      }}
      mb="12"
    >
      <Flex
        // bg="gray.800"
        flex="1"
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
        <Flex justifyContent="space-between">
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              marginBottom="1"
            >
              Order #{props.order._id.substring(0,5)}
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
              {(props.order.status === 1) ? "Pending" : "Delivered" }
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
              <Flex justifyContent="space-between" key={idx}>
                <Box w={1 / 3}>
                  <Image
                    rounded="full"
                    boxSize="50px"
                    objectFit="cover"
                    src={`/images/${product.image}`}
                    alt={product.name+"-"+product.image}
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
                      {product.desc}
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
                        Qty: {product.quantity}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
        </Box>
        {/* </Collapse> */}

        <Box pt="4" width="full">
          <Flex justifyContent="space-between" alignItems="center">
            <Box fontSize="xl" fontWeight="semibold" color="blue.500">
              <Box as="span" color={"gray.600"} fontSize="md" mr="1">
                S/
              </Box>
              {props.order.total?.toFixed(2)}
            </Box>
            <Flex fontSize="xl" fontWeight="semibold">
              <Button size="lg" display={"flex"} mr="2" colorScheme="green">
                <Icon as={FiCheck} h={5} w={5} alignSelf={"center"} />
              </Button>
              <Button size="lg" display={"flex"} colorScheme="red">
                <Icon as={FiX} h={5} w={5} alignSelf={"center"} />
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default OrdersCard;
