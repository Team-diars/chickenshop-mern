import React from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { FiPlus, FiShoppingCart } from "react-icons/fi";

function ProductAddToCart(props) {
  return (
    <Box width={["full", "48", "52"]} mb="16" mx="2">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxHeight="320px"
        borderWidth="1px"
        rounded="xl"
        shadow="lg"
        transition="all .2s ease-in"
        _hover={{
          shadow: "md",
          bg: useColorModeValue("yellow.50", "yellow.700"),
        }}
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {props.product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="yellow.200"
          />
        )}

        <Image
          marginTop="-10"
          rounded="full"
          boxSize="150px"
          border="2px"
          borderColor="yellow.200"
          objectFit="cover"
          src={`/images/${props.product.image}`}
          alt={props.product.name}
        />

        <Box py="6" px="4" width="full">
          {/* <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box> */}
          <Flex mt="1" justifyContent="center" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              marginBottom="10px"
            >
              {props.product.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              color={useColorModeValue("blue.500", "white")}
            >
              <Box as="span" color={"gray.600"} fontSize="md" mr="1">
                S/
              </Box>
              {props.product.price.toFixed(2)}
            </Box>
            {props.onAddToCart && (
              <Tooltip
                label="Agregar"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1em"}
              >
                <Button onClick={props.onAddToCart} display={"flex"}>
                  <Icon as={FiPlus} h={5} w={5} alignSelf={"center"} />
                </Button>
              </Tooltip>
            )}
            {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductAddToCart;
