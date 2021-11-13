import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";
import { addProductCart } from "../../actions/cart";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

import ProductAddToCart from "../../components/products/ProductCard";
import Cart from "../../components/cart/Cart";
import { WebSocketContext } from "../../ws";
import io from "socket.io-client";
import OrderStatus from "../../components/orders/OrderStatus";

const MenuScreen = ({
  getProducts,
  products: { products },
  addProductCart,
}) => {
  const [order, setOrder] = useState([]);
  const ws = useContext(WebSocketContext);
  const dishes = products.filter((item) => item.category === "platos");
  const drinks = products.filter((item) => item.category === "bebidas");
  const salads = products.filter((item) => item.category === "ensaladas");
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Container maxWidth="container.xl" paddingY="10">
      {/* <OrderStatus /> */}
      <Text
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        lineHeight="short"
        marginBottom="6"
      >
        Menu
      </Text>
      <Box>
        <Text mt="8" fontSize="2xl" fontWeight="bold" color={"black"}>
          Platos
        </Text>
        <Flex w="full" flexWrap="wrap" mt="16">
          {dishes.map((item, idx) => (
            <ProductAddToCart
              key={idx}
              product={item}
              onAddToCart={() => addProductCart(item)}
            />
          ))}
        </Flex>
      </Box>
      <Box>
        <Text mt="8" fontSize="2xl" fontWeight="bold" color={"black"}>
          Bebidas
        </Text>
        <Flex w="full" flexWrap="wrap" mt="16">
          {drinks.map((item, idx) => (
            <ProductAddToCart
              key={idx}
              product={item}
              onAddToCart={() => addProductCart(item)}
            />
          ))}
        </Flex>
      </Box>
      <Box>
        <Text mt="8" fontSize="2xl" fontWeight="bold" color={"black"}>
          Ensaladas
        </Text>
        <Flex w="full" flexWrap="wrap" mt="16">
          {salads.map((item, idx) => (
            <ProductAddToCart
              key={idx}
              product={item}
              onAddToCart={() => addProductCart(item)}
            />
          ))}
        </Flex>
      </Box>
      <Cart />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
});

const mapDispatchToProps = {
  getProducts,
  addProductCart: (product) => addProductCart({ ...product, quantity: 1 }),
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
