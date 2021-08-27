import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { addTicket } from "../../actions/ticket";
import { connect } from "react-redux";
import { Box, Button, Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";

const TableCart = ({ cart, num_table, setCart, setNumTable, addTicket }) => {
  
  const saveTicket = () => {
    const data = cart.map((item) => {
      return item;
    });
    addTicket({
      num_table,
      product: data,
    });
    setCart([]);
    setNumTable("");
  };
  const removeItem = ({ name }) => {
    
    return setCart(
      cart.filter(
        (dish) =>
          dish.dish_name !== name ??
          dish.drink_name !== name ??
          dish.salad_name !== name
      )
    );
  };
  return (
    <>
      <Box marginBottom="4">
        <Table variant="striped" size="lg">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Quantity</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((dish, idx) => (
              <Tr key={idx}>
                <Td>{dish.dish_name ?? dish.drink_name ?? dish.salad_name}</Td>
                <Td>
                  {dish.dish_quantity ??
                    dish.drink_quantity ??
                    dish.salad_quantity}
                </Td>
                <Td>
                  <Button onClick={(e) => removeItem({ name: dish.dish_name })}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Button type="submit" onClick={saveTicket}>
        Add Order <i className="fas fa-cart-plus"></i>
      </Button>
    </>
  );
};

TableCart.propTypes = {
  addTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { addTicket })(TableCart);
