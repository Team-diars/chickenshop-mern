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
import TableCart from "./../orders/TableCart";
import MainTable from "./../orders/MainTable";
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
} from "@chakra-ui/react";

import { WebSocketContext } from "../../ws";
import io from "socket.io-client";
import { addOrder } from "../../actions/order";

let socket;
const CONNECTION_PORT = `http://localhost:5000/`;

const CartScreen = ({ cart, isAdded, clearCart, updateProductCart }) => {
  //   const data = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const sendPayload = () => {
    const payload = {
      cart,
      products: [
        {
          name: "helado 1LT",
          price: 12,
          category: "Icecream",
          qty: 2,
          creams: [],
        },
      ],
    };
    socket.emit("send-order", payload, (data) => {
      console.log(data);
    });
    dispatch(addOrder(payload));

    //   This will handle adding the order
    console.log("enviando ordennnn");
    ws.sendOrder(payload);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  // if (isAdded) {
  //   onOpen();
  // }
  //   const [cart1, setCart] = useState([]);

  //   const [num_table, setNumTable] = useState("");

  //   const [formDataDishes, setFormDataDishes] = useState({
  //     dish_name: "",
  //     dish_quantity: "",
  //     dish_id: null,
  //   });

  //   const { dish_name, dish_quantity } = formDataDishes;

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
  //   addTicket({
  //     num_table,
  //     product: data,
  //   });
  console.log("CART Component:", cart);
  console.log("isAdded:", isAdded, onOpen);
  //   useEffect(() => {
  //     getCart();
  //   }, [getCart]);
  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        position="fixed"
        bottom="10"
        right="10"
      >
        Cart
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
          <DrawerHeader borderBottomWidth="1px">Cart</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <TableCart cart={cart} />
              {
                <Box display="flex" justifyContent="flex-end">
                  <Text>Total: a</Text>
                </Box>
              }
              {cart.length > 0 && (
                <Box display="flex" justifyContent="space-between">
                  <Button variant="outline" mr={3} onClick={clearCart}>
                    Clear cart
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="yellow"
                    mr={3}
                    onClick={clearCart}
                  >
                    Update cart
                  </Button>
                </Box>
              )}
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter user name"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  ref={firstField}
                  type="email"
                  id="email"
                  placeholder="Please enter user name"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Note</FormLabel>
                <Textarea id="desc" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={sendPayload}>
              Make an order
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   // cart: state.cart,

// });
// const mapDispatchToProps = {
//   getCart,
//   deleteProductCart: (id) => deleteProductCart(id),
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
const mapDispatchToProps = {
  clearCart,
  updateProductCart: (quantity, id) => updateProductCart(quantity, id),
};
export default connect(null, mapDispatchToProps)(CartScreen);
