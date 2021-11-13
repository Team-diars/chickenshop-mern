import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getProducts } from "./../../actions/product";
import { addProductCart } from "./../../actions/cart";
import TableCart from "./../../components/cart/TableCart";
import MainTable from "./../../components/orders/MainTable";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Text,
  Button,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const OrderScreen = ({
  getProducts,
  addProductCart,
  cart: { cart },
  product: { products, loading },
}) => {
  // const cart = useSelector((state) => state.cart.cart);
  const [num_table, setNumTable] = useState("");
  const [formDataMenu, setFormDataMenu] = useState({
    dishes: {
      name: "",
      price: 0,
      quantity: 1,
      _id: null,
    },
    drinks: {
      name: "",
      price: 0,
      quantity: 1,
      _id: null,
    },
    salads: {
      name: "",
      price: 0,
      quantity: 1,
      _id: null,
    },
  });
  const { dishes, drinks, salads } = formDataMenu;

  const pdishes = products.filter((item) => item.category === "platos");
  const pdrinks = products.filter((item) => item.category === "bebidas");
  const psalads = products.filter((item) => item.category === "ensaladas");

  const onChangeTable = (e) => {
    const { value, type } = e.target;
    const table = value ? parseInt(value) : value;
    setNumTable(table);
  };

  const onChangeMenu = (e) => {
    const { name, value, type, options, dataset } = e.target;
    console.log("Target:", e, name, value, type, dataset);
    setFormDataMenu({
      ...formDataMenu,
      [dataset.category]: {
        ...(type === "select-one" && options
          ? JSON.parse(options[options.selectedIndex].dataset.product)
          : formDataMenu[dataset.category]),
        quantity:
          type === "number" && name === "quantity"
            ? parseInt(value)
            : formDataMenu[dataset.category].quantity,
      },
    });
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  console.log("CartList:", cart);
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="10">
        Registrar Pedido
      </Text>
      <Flex width="full" flexDirection="column" wrap="wrap">
        <Box display="flex">
          <Box flex="1">
            <FormControl marginBottom="5">
              <FormLabel>Nro. Mesa</FormLabel>
              {/* <Input
                width="20"
                placeholder="#"
                type="number"
                name="num_table"
                value={num_table}
                onChange={(e) => onChangeTable(e)}
              /> */}
              <Select
                width="24"
                as="select"
                name="num_table"
                value={num_table}
                onChange={(e) => onChangeTable(e)}
              >
                <option value="">Mesa</option>
                {["1", "2", "3", "4", "5"].map((table, idx) => (
                  <option key={idx} value={table}>
                    {table}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Platos</FormLabel>
              <InputGroup id="dishes">
                <Select
                  mr="2"
                  as="select"
                  data-category="dishes"
                  name="dishes"
                  value={dishes.name}
                  onChange={(e) => onChangeMenu(e)}
                >
                  <option value="">Selecciona un plato</option>
                  {pdishes.map((product) => (
                    <option
                      key={product._id}
                      value={product.name}
                      data-product={JSON.stringify(product)}
                    >
                      {product.name}(S/{product.price.toFixed(2)})
                    </option>
                  ))}
                </Select>
                {/* <NumberInput
                  mr="2"
                  min={1}
                  name="quantity"
                  value={dishes.quantity}
                  onChange={(e) => onChangeMenu(e)}
                >
                  <NumberInputField data-category="dishes" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput> */}
                <Input
                  mr="2"
                  data-category="dishes"
                  name="quantity"
                  value={dishes.quantity}
                  type="number"
                  min="1"
                  placeholder="Cantidad"
                  onChange={(e) => onChangeMenu(e)}
                />
                <Button onClick={() => addProductCart(dishes, dishes.quantity)}>
                  <Icon as={FiPlus} h={5} w={5} alignSelf={"center"} />
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Bebidas</FormLabel>
              <InputGroup>
                <Select
                  mr="2"
                  as="select"
                  data-category="drinks"
                  name="drinks"
                  value={drinks.name}
                  onChange={(e) => onChangeMenu(e)}
                >
                  <option value="">Selecciona una bebida</option>
                  {pdrinks.map((product) => (
                    <option
                      key={product._id}
                      value={product.name}
                      data-product={JSON.stringify(product)}
                    >
                      {product.name}(S/{product.price.toFixed(2)})
                    </option>
                  ))}
                </Select>
                <Input
                  mr="2"
                  type="number"
                  data-category="drinks"
                  name="quantity"
                  value={drinks.quantity}
                  placeholder="Cantidad"
                  onChange={(e) => onChangeMenu(e)}
                />
                <Button onClick={() => addProductCart(drinks, drinks.quantity)}>
                  <Icon as={FiPlus} h={5} w={5} alignSelf={"center"} />
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Ensaladas</FormLabel>
              <InputGroup>
                <Select
                  mr="2"
                  as="select"
                  data-category="salads"
                  name="salads"
                  value={salads.name}
                  onChange={(e) => onChangeMenu(e)}
                >
                  <option value="">Selecciona una ensalada</option>
                  {psalads.map((product) => (
                    <option
                      key={product._id}
                      value={product.name}
                      data-product={JSON.stringify(product)}
                    >
                      {product.name}(S/{product.price.toFixed(2)})
                    </option>
                  ))}
                </Select>
                <Input
                  mr="2"
                  type="number"
                  data-category="salads"
                  name="quantity"
                  placeholder="Cantidad"
                  value={salads.quantity}
                  onChange={(e) => onChangeMenu(e)}
                />

                <Button onClick={() => addProductCart(salads, salads.quantity)}>
                  <Icon as={FiPlus} h={5} w={5} alignSelf={"center"} />
                </Button>
              </InputGroup>
            </FormControl>
          </Box>
          <Box flex="1" px="8">
            <TableCart cart={cart} num_table={num_table} />
          </Box>
        </Box>
        <Box width="full" flex="1" mt="12">
          <MainTable />
        </Box>
      </Flex>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});

const mapDispatchToProps = {
  getProducts,
  addProductCart: (product, quantity) =>
    addProductCart({ ...product, quantity }),
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
