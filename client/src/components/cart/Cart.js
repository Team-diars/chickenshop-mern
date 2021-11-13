import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addTicket } from "../../actions/ticket";
import { clearCart } from "../../actions/cart";
import TableCart from "./../cart/TableCart";

import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import { FiShoppingCart } from "react-icons/fi";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { WebSocketContext } from "../../ws";

const CartScreen = ({ clearCart, cart: { cart } }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const ptotal = cart
    .reduce((result, item) => item.quantity * item.price + result, 0)
    .toFixed(2);

  const orderSchema = Yup.object().shape({
    customer: Yup.string()
      // .min(5, "El nombre debe ser de almenos 5 caracteres")
      .required("Ingresa el nombre"),
    note: Yup.string(),
    email: Yup.string()
      .email("Ingresa un email valido")
      .required("Ingresa un email"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(orderSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const ws = useContext(WebSocketContext);
  const submitOrder = (values) => {
    console.log("Data:", values);
    return new Promise((resolve) => {
      setTimeout(() => {
        const payload = [
          {
            // total: ptotal,
            // status: 1,
            // specialDelivery: true,
            customer: values.customer,
            email: values.email,
            note: values.note,
            products: cart,
          },
        ];
        console.log("sent!", payload);
        // This will handle adding the order
        ws.sendOrder(payload);
        clearCart();
        reset();
        onClose();
        resolve();
      }, 1000);
    });
  };
  const onCloseCart = () => {
    reset();
    onClose();
  };
  console.log("Cart:", cart);
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
                  <Button variant="outline" mr={3} onClick={clearCart}>
                    Limpiar carrito
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="yellow"
                    mr={3}
                    onClick={clearCart}
                  >
                    Actualizar carrito
                  </Button>
                </Box>
              )}
              <form id="sendOrder-frm" onSubmit={handleSubmit(submitOrder)}>
                <FormControl isInvalid={errors.customer}>
                  <FormLabel htmlFor="username">Nombre</FormLabel>
                  <Input
                    ref={firstField}
                    id="username"
                    {...register("customer")}
                  />
                  {errors.customer && errors.customer.message ? (
                    <FormErrorMessage>
                      {errors.customer.message}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl mt={3} isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input type="email" id="email" {...register("email")} />
                  {errors.email && errors.email.message ? (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl mt={3} isInvalid={errors.note}>
                  <FormLabel htmlFor="desc">Nota</FormLabel>
                  <Textarea id="desc" {...register("note")} />
                  {errors.note && errors.note.message ? (
                    <FormErrorMessage>{errors.note.message}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </form>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onCloseCart}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              form="sendOrder-frm"
              type="submit"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Hacer pedido
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  clearCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
