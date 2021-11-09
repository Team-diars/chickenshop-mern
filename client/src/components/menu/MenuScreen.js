import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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

import ProductAddToCart from "../../components/products/ProductCard";
import Cart from "../../components/cart/Cart";

const MenuScreen = ({
  getCart,
  getProducts,
  products: { products },
  cart: { cart },
  addProductCart,
}) => {
  console.log("cart", cart);
  const dishes = products.filter((item) => item.category === "dishes");
  const drinks = products.filter((item) => item.category === "drinks");
  const salads = products.filter((item) => item.category === "salads");
  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts, getCart]);
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text textAlign="center" fontSize="3xl" fontWeight="bold" color={"black"}>
        Menu
      </Text>
      <Box>
        <Text mt="8" fontSize="2xl" fontWeight="bold" color={"black"}>
          Platos
        </Text>
        <Flex w="full" flexWrap="wrap" mt="20">
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
        <Flex w="full" flexWrap="wrap" mt="20">
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
        <Flex
          w="full"
          justifyContent={["space-between"]}
          flexWrap="wrap"
          mt="20"
        >
          {salads.map((item, idx) => (
            <ProductAddToCart
              key={idx}
              product={item}
              onAddToCart={() => addProductCart(item)}
            />
          ))}
        </Flex>
      </Box>
      <Cart cart={cart} isAdded={true} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
  cart: state.cart,
});

const mapDispatchToProps = {
  getCart,
  getProducts,
  addProductCart: (product) => addProductCart({ ...product, quantity: 1 }),
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
