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
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Icon,
  TableCaption,
} from "@chakra-ui/react";
import {
  updateProductCart,
  deleteProductCart,
  addQtyProductCart,
  removeQtyProductCart,
} from "../../actions/cart";
import { FiMinus, FiPlus, FiSmile, FiTrash2 } from "react-icons/fi";

const TableCart = (props) => {
  // console.log("Tablecart:", props);
  const cart = props.cart || [];
  const ptotal = props.total || 0;
  return (
    <>
      <Box marginBottom="4">
        <Table variant="striped" size="md" colorScheme="yellow">
          {/* <TableCaption>
            <Icon as={FiSmile} h={5} w={5} alignSelf={"center"} />
          </TableCaption> */}
          <Thead>
            <Tr>
              <Th>Producto</Th>
              <Th>Can.</Th>
              <Th>Precio</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.length > 0 ? (
              cart.map((dish, idx) => (
                <Tr key={idx}>
                  <Td>{dish.name}</Td>
                  <Td>
                    <InputGroup size="xs">
                      <InputLeftElement>
                        <Button
                          size="sm"
                          onClick={() => props.removeQtyProductCart(dish._id)}
                        >
                          <Icon as={FiMinus} h={4} w={4} />
                        </Button>
                      </InputLeftElement>
                      <Input
                        type="number"
                        min="1"
                        width="100px"
                        height="auto"
                        textAlign="center"
                        fontSize="md"
                        name="product_quantity"
                        placeholder="Cantidad"
                        value={dish.quantity}
                        isReadOnly
                        variant="unstyled"
                        // onChange={(e) =>
                        //   props.updateProductCart(e.target.value, dish._id)
                        // }
                      />
                      <InputRightElement>
                        <Button
                          size="sm"
                          onClick={() => props.addQtyProductCart(dish._id)}
                        >
                          <Icon as={FiPlus} h={4} w={4} />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Td>
                  <Td isNumeric>S/{(dish.price * dish.quantity).toFixed(2)}</Td>
                  <Td>
                    <Button
                      size="sm"
                      onClick={() => props.deleteProductCart({ id: dish._id })}
                    >
                      <Icon as={FiTrash2} h={4} w={4} />
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4" textAlign="center">
                  El carrito esta vacio
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total:</Th>
              <Th></Th>
              <Th isNumeric>
                S/
                {ptotal}
              </Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  updateProductCart: (quantity, id) => updateProductCart(quantity, id),
  addQtyProductCart: (id) => addQtyProductCart(id),
  removeQtyProductCart: (id) => removeQtyProductCart(id),
  deleteProductCart: (id) => deleteProductCart(id),
};
export default connect(null, mapDispatchToProps)(TableCart);
