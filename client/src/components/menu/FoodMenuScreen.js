import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";
import { getCart, addProductCart, deleteProductCart } from "../../actions/cart";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  // useDisclosure,
  Container,
  createIcon,
  Heading,
  Divider,
} from "@chakra-ui/react";

import ProductAddToCart from "../../components/home/ProductCard";
import Cart from "../../components/cart/Cart";

const MenuScreen = ({
  getProducts,
  products: { products },
  cart: { cart },
  addProductCart,
}) => {
  console.log(cart);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Container maxWidth="container.xl">
      <Text
        mt="8"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        color={"black"}
      >
        Menu
      </Text>
      <Box>
        <Text mt="8" fontSize="2xl" fontWeight="bold" color={"black"}>
          Dishes
        </Text>
        <Flex w="full" flexWrap="wrap" mt="20">
          {products.map((item, idx) => (
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
          Drinks
        </Text>
        <Flex w="full" flexWrap="wrap" mt="20">
          {products.map((item, idx) => (
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
          Salads
        </Text>
        <Flex w="full" flexWrap="wrap" mt="20">
          {products.map((item, idx) => (
            <ProductAddToCart
              key={idx}
              product={item}
              onAddToCart={() => addProductCart(item)}
            />
          ))}
        </Flex>
      </Box>
      <Cart cart={cart} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
  cart: state.cart,
});

const mapDispatchToProps = {
  getProducts,
  addProductCart: (product) => addProductCart({ ...product, quantity: 1 }),
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
