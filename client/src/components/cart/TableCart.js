import React from "react";
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
import { addTicket } from "../../actions/ticket";

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const TableCart = (props) => {
  const num_table = props.num_table || "";
  const cart = props.cart || [];
  const ptotal =
    props.total ||
    cart
      .reduce((result, item) => item.quantity * item.price + result, 0)
      .toFixed(2);
  return (
    <>
      <Box marginBottom="4">
        <Table variant="striped" size="md" colorScheme="yellow">
          {num_table ? (
            <TableCaption>
              Todos estos productos seran agregados al pedido de la mesa #
              {num_table}
            </TableCaption>
          ) : null}
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
                          rounded="full"
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
                        value={dish.quantity}
                        isReadOnly
                        variant="unstyled"
                        // onChange={(e) =>
                        //   props.updateProductCart(e.target.value, dish._id)
                        // }
                      />
                      <InputRightElement>
                        <Button
                          rounded="full"
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
              <Th isNumeric>S/{ptotal}</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
        {num_table && (
          <Box mt="5" textAlign="right">
            <Button
              colorScheme="blue"
              size="md"
              onClick={() => props.addTicket({ num_table, product: cart })}
            >
              Guardar Ticket
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  updateProductCart: (quantity, id) => updateProductCart(quantity, id),
  addQtyProductCart: (id) => addQtyProductCart(id),
  removeQtyProductCart: (id) => removeQtyProductCart(id),
  deleteProductCart: (id) => deleteProductCart(id),
  addTicket: (data) => addTicket(data),
};
export default connect(null, mapDispatchToProps)(TableCart);
