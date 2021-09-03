import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Table,
  Tbody,
  Th,
  Thead,
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
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((dish, idx) => (
              <Tr key={idx}>
                <Td>{dish.name}</Td>
                <Td>
                  <Input
                    type="number"
                    name="product_quantity"
                    placeholder="Quantity"
                    value={dish.quantity}
                    onChange={(e) =>
                      updateProductCart(e.target.value, dish._id)
                    }
                  />
                </Td>
                <Td>
                  <Button onClick={() => deleteProductCart({ id: dish._id })}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
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
