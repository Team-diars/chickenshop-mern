import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProducts } from "../../actions/product";
import { addProductCart } from "../../actions/cart";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Container,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import ProductAddToCart from "../../components/products/ProductCard";
import Cart from "../../components/cart/Cart";
import OrderStatus from "../../components/orders/OrderStatus";

const MenuTableScreen = ({
  getProducts,
  products: { products },
  addProductCart,
  match,
}) => {
  const num_table = match.params.id;
  const tables = ["1", "2", "3", "4", "5"];
  const validNumTable = tables.includes(num_table);

  const dishes = products.filter((item) => item.category === "platos");
  const drinks = products.filter((item) => item.category === "bebidas");
  const salads = products.filter((item) => item.category === "ensaladas");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (!validNumTable) {
    return <Redirect to="/" />;
  }
  return (
    <Container maxWidth="container.xl" paddingY="10">
      {/* <OrderStatus /> */}

      <Box display="flex" justifyContent="center" marginBottom="6">
        <Alert display="flex" justifyContent="center" maxW="sm" status="info">
          <AlertIcon />
          <AlertDescription display="flex" fontSize={["sm", "md"]}>
            El pedido se registrara a la mesa
            <Text fontSize={["md", "lg"]} fontWeight="semibold" ml={["1", "2"]}>
              #{match.params.id}
            </Text>
          </AlertDescription>
        </Alert>
      </Box>

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
export default connect(mapStateToProps, mapDispatchToProps)(MenuTableScreen);
