import React, { useContext, useEffect, useState } from "react";
// import { getProducts } from "../../actions/product";
import { connect, useDispatch, useSelector } from "react-redux";
import { addTicket } from "../../actions/ticket";
import {
  getCart,
  deleteProductCart,
  clearCart,
  updateProductCart,
} from "../../actions/cart";
import TableCart from "./../cart/TableCart";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Button,
  useDisclosure,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Drawer,
  Stack,
  InputRightAddon,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import { addOrder } from "../../actions/order";
import { FiShoppingCart } from "react-icons/fi";
import { WebSocketContext } from "../../ws";
import { category } from "../../reducers/category";

const CartScreen = (props) => {
  //   const data = useSelector((state) => state.order);
  let cart = props.cart;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  // if (localStorage.getItem("cart")) {
  //   cart = JSON.parse(localStorage.getItem("cart"));
  //   console.log("CartFromLS:", JSON.parse(localStorage.getItem("cart")));
  // } else {
  // localStorage.setItem("cart", JSON.stringify(cart));
  // }
  // cart.push(product);
  // if (isAdded) {
  //   onOpen();
  // }
  //   const [cart1, setCart] = useState([]);

  //   const [num_table, setNumTable] = useState("");

  //   const onChange = (e) => {
  //     const { value, type } = e.target;
  //     setNumTable(type === "number" ? parseInt(value) : value);
  //   };

  //   const onChangeDishes = (e) => {
  //     const { name, value, type } = e.target;
  //     setFormDataDishes({
  //       ...formDataDishes,
  //       [name]: type === "number" ? parseInt(value) : value,
  //     });
  //   };
  //   const saveTicket = () => {
  //     const data = cart.map((item) => {
  //       return item;
  //     });

  //     setCart([]);
  //   };
  // addTicket({
  //   num_table,
  //   product: data,
  // });
  // useEffect(() => {
  //   getCart();
  // }, [getCart]);
  const productsCart =
    cart.length > 0
      ? cart.map((dish) => {
          return {
            name: dish.name,
            desc: dish.name,
            price: dish.price,
            category: dish.category,
            qty: dish.quantity,
            creams: [],
          };
        })
      : [];
  const ptotal = cart
    .reduce((result, item) => item.quantity * item.price + result, 0)
    .toFixed(2);
  console.log(productsCart, ptotal);
  const ws = useContext(WebSocketContext);
  const sendPayload = () => {
    const payload = [
      {
        total: ptotal,
        status: 1,
        specialDelivery: true,
        products: productsCart,
      },
    ];
    console.log("sent!", payload);
    // This will handle adding the order
    ws.sendOrder(payload);
  };
  return (
    <>
      <Button onClick={onOpen} position="fixed" top="50%" right="10">
        <Icon as={FiShoppingCart} h={6} w={6} alignSelf={"center"} />
        <Box
          pos="absolute"
          top="-1px"
          right="-1px"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          lineHeight="none"
          color="red.100"
          transform="translate(50%,-50%)"
          bg="red.600"
          rounded="full"
        >
          {cart.length}
        </Box>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Carrito</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <TableCart cart={cart} total={ptotal} />
              {cart.length > 0 && (
                <Box display="flex" justifyContent="space-between">
                  <Button variant="outline" mr={3} onClick={props.clearCart}>
                    Limpiar carrito
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="yellow"
                    mr={3}
                    onClick={props.clearCart}
                  >
                    Actualizar carrito
                  </Button>
                </Box>
              )}
              <Box>
                <FormLabel htmlFor="username">Nombre</FormLabel>
                <Input ref={firstField} id="username" placeholder="" />
              </Box>
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  ref={firstField}
                  type="email"
                  id="email"
                  placeholder=""
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Nota</FormLabel>
                <Textarea id="desc" />
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={sendPayload}>
              Hacer pedido
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   cart: state.cart,
// });

const mapDispatchToProps = {
  // getCart,
  clearCart,
  updateProductCart: (quantity, id) => updateProductCart(quantity, id),
};
export default connect(null, mapDispatchToProps)(CartScreen);
