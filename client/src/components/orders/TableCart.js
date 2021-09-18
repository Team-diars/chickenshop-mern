import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
  Tfoot,
  Tr,
  Td,
  Input,
} from "@chakra-ui/react";
import { updateProductCart, deleteProductCart } from "../../actions/cart";

const TableCart = ({ cart, deleteProductCart, updateProductCart }) => {
  console.log("TableCart:", cart);
  return (
    <>
      <Box marginBottom="4">
        <Table variant="striped" size="lg">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.length > 0 ? (
              cart.map((dish, idx) => (
                <Tr key={idx}>
                  <Td>{dish.name}</Td>
                  <Td>
                    <Input
                      type="number"
                      min="1"
                      name="product_quantity"
                      placeholder="Quantity"
                      value={dish.quantity}
                      onChange={(e) =>
                        updateProductCart(e.target.value, dish._id)
                      }
                    />
                  </Td>
                  <Td>{(dish.price * dish.quantity).toFixed(2)}</Td>
                  <Td>
                    <Button onClick={() => deleteProductCart({ id: dish._id })}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4" textAlign="center">
                  Cart is empty
                </Td>
              </Tr>
            )}
          </Tbody>
          {
            cart.reduce(
              (result, item) => item.quantity * item.price + result,
              0
            )
            /* <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th isNumeric>--</Th>
            </Tr>
          </Tfoot> */
          }
        </Table>
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  updateProductCart: (quantity, id) => updateProductCart(quantity, id),
  deleteProductCart: (id) => deleteProductCart(id),
};
export default connect(null, mapDispatchToProps)(TableCart);
