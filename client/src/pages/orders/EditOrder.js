import React, { useEffect } from "react";
import { getTicketByID } from "../../actions/ticket";
import { getProducts } from "../../actions/product";
import { connect } from "react-redux";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Container,
  Text,
  Flex,
  Badge,
  useColorModeValue,
  Icon,
  Circle,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

const EditOrder = ({
  getTicketByID,
  getProducts,
  ticket: { ticket, loading: t_loading },
  product: { products, loading: p_loading },
  match,
}) => {
  const updateTicket = () => {};

  const getProductByID = (id) => {
    return !p_loading && products.find((p) => p._id === id);
  };
  const productsName =
    !t_loading &&
    ticket &&
    ticket.product.map((id) => {
      return getProductByID(id) || false;
    });

  const getTicket = (id) => {
    getTicketByID(id);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    getTicket(match.params.id);
  }, [match.params.id]);
  console.log(productsName);
  return (
    <Container paddingY="10">
      <Box
        display="flex"
        alignItems="center"
        marginBottom="6"
        position="relative"
      >
        <Button as={ReachLink} to="/orders" mr={[3, 5]} variant="ghost">
          <Icon as={FiArrowLeft} h={[5, 6]} w={[5, 6]} alignSelf={"center"} />
        </Button>
        <Text
          fontSize="2xl"
          textAlign="center"
          fontWeight="bold"
          lineHeight="short"
        >
          Editar Pedido
        </Text>
      </Box>
      <Box p="4" borderWidth="1px" borderRadius="md">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Categoria</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {!t_loading &&
              productsName &&
              productsName.map((item, idx) => (
                <Tr key={idx}>
                  <Td>{item.name}</Td>
                  <Td>S/ {item.price}</Td>
                  <Td>{item.category}</Td>
                  {/* <Td>
                    <Button className="btn-danger btn-sm">
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Td> */}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Box mt="4" display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          colorScheme="blue"
          type="submit"
          onClick={updateTicket}
          // isDisabled={isSubmitting}
          // isLoading={isSubmitting}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  product: state.product,
});

export default connect(mapStateToProps, { getTicketByID, getProducts })(
  EditOrder
);
