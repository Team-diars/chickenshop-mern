import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";
import { getCart } from "../../actions/cart";
import TableCart from "./TableCart";
import MainTable from "./MainTable";
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
} from "@chakra-ui/react";

const OrderScreen = ({
  getProducts,
  getCart,
  cart: { cartlist },
  product: { products, loading },
}) => {
  console.log("CartList:", cartlist);
  const [cart, setCart] = useState([]);
  const [num_table, setNumTable] = useState("");
  const [formDataDishes, setFormDataDishes] = useState({
    dish_name: "",
    dish_quantity: "",
    dish_id: null,
  });
  const [formDataDrinks, setFormDataDrinks] = useState({
    drink_name: "",
    drink_quantity: "",
    drink_id: null,
  });
  const [formDataSalads, setFormDataSalads] = useState({
    salad_name: "",
    salad_quantity: "",
    salad_id: null,
  });
  const { dish_name, dish_quantity } = formDataDishes;
  const { drink_name, drink_quantity } = formDataDrinks;
  const { salad_name, salad_quantity } = formDataSalads;

  const onChange = (e) => {
    const { value, type } = e.target;
    setNumTable(type === "number" ? parseInt(value) : value);
  };

  const onChangeDishes = (e) => {
    const { name, value, type } = e.target;
    setFormDataDishes({
      ...formDataDishes,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const onChangeDrinks = (e) => {
    const { name, value, type } = e.target;
    setFormDataDrinks({
      ...formDataDrinks,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const onChangeSalads = (e) => {
    const { name, value, type } = e.target;
    setFormDataSalads({
      ...formDataSalads,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const addDish = () => {
    const item = cart.find((item) => item.dish_name === dish_name);
    const product = products.find(
      (item) => item.name === dish_name && item.status
    );
    if (item) {
      item.dish_quantity += dish_quantity;
      return setFormDataDishes({
        dish_id: product._id,
        dish_name: "",
        dish_quantity: 0,
      });
    }
    setCart([
      ...cart,
      {
        dish_id: product._id,
        dish_name,
        dish_quantity: dish_quantity,
      },
    ]);
    setFormDataDishes({
      dish_id: null,
      dish_name: "",
      dish_quantity: "",
    });
  };

  const addDrink = () => {
    const item = cart.find((item) => item.drink_name === drink_name);
    const product = products.find(
      (item) => item.name === drink_name && item.status
    );

    if (item) {
      setFormDataDishes({
        drink_id: product._id,
        drink_name: "",
        drink_quantity: 0,
      });
      return (item.drink_quantity += drink_quantity);
    }
    setCart([
      ...cart,
      {
        drink_id: product._id,
        drink_name: drink_name,
        drink_quantity: drink_quantity,
      },
    ]);
    setFormDataDrinks({
      drink_id: null,
      drink_name: "",
      drink_quantity: "",
    });
  };

  const addSalad = () => {
    const item = cart.find((item) => item.salad_name === salad_name);
    const product = products.find(
      (item) => item.name === salad_name && item.status
    );
    if (item) {
      setFormDataSalads({
        salad_id: product._id,
        salad_name: "",
        salad_quantity: 0,
      });
      return (item.salad_quantity += salad_quantity);
    }
    setCart([
      ...cart,
      {
        salad_id: product._id,
        salad_name,
        salad_quantity,
      },
    ]);
    setFormDataSalads({
      salad_id: null,
      salad_name: "",
      salad_quantity: "",
    });
  };
  console.log("CART:", cart);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Container maxWidth="container.xl">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Orders
      </Text>
      <Flex width="full" flexDirection="column" wrap="wrap">
        <Box display="flex">
          <Box flex="1">
            <FormControl marginBottom="5">
              <FormLabel>Table number</FormLabel>
              <Input
                width="20"
                placeholder="#1"
                type="number"
                name="num_table"
                value={num_table}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Dishes</FormLabel>
              <InputGroup>
                <Select
                  mr="2"
                  as="select"
                  name="dish_name"
                  value={dish_name}
                  onChange={(e) => onChangeDishes(e)}
                >
                  <option value="">-- Select a dish --</option>
                  {products.map(
                    (product) =>
                      product.category === "dishes" && (
                        <option key={product._id} value={product.name}>
                          {product.name}
                        </option>
                      )
                  )}
                </Select>
                <Input
                  mr="2"
                  name="dish_quantity"
                  value={dish_quantity}
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) => onChangeDishes(e)}
                />

                <Button onClick={addDish}>
                  <i className="fas fa-plus"></i>
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Drinks</FormLabel>
              <InputGroup>
                <Select
                  mr="2"
                  as="select"
                  name="drink_name"
                  value={drink_name}
                  onChange={(e) => onChangeDrinks(e)}
                >
                  <option value="">-- Select a drink --</option>
                  {products.map(
                    (product) =>
                      product.category === "drinks" && (
                        <option key={product._id} value={product.name}>
                          {product.name}
                        </option>
                      )
                  )}
                </Select>
                <Input
                  mr="2"
                  type="number"
                  name="drink_quantity"
                  value={drink_quantity}
                  placeholder="Quantity"
                  onChange={(e) => onChangeDrinks(e)}
                />
                <Button onClick={addDrink}>
                  <i className="fas fa-plus"></i>
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="5">
              <FormLabel>Salads</FormLabel>
              <InputGroup>
                <Select
                  mr="2"
                  as="select"
                  name="salad_name"
                  value={salad_name}
                  onChange={(e) => onChangeSalads(e)}
                >
                  <option value="">-- Select a salad --</option>
                  {products.map(
                    (product) =>
                      product.category === "salads" && (
                        <option key={product._id} value={product.name}>
                          {product.name}
                        </option>
                      )
                  )}
                </Select>
                <Input
                  mr="2"
                  type="number"
                  name="salad_quantity"
                  placeholder="Quantity"
                  value={salad_quantity}
                  onChange={(e) => onChangeSalads(e)}
                />

                <Button onClick={addSalad}>
                  <i className="fas fa-plus"></i>
                </Button>
              </InputGroup>
            </FormControl>
          </Box>
          <Box flex="1" px="4">
            <TableCart
              cart={cart}
              setNumTable={setNumTable}
              setCart={setCart}
              num_table={num_table}
            />
          </Box>
        </Box>
        <Box flex="1" mt="12">
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

export default connect(mapStateToProps, { getProducts, getCart })(OrderScreen);
