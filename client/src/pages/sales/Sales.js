import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getProducts } from "./../../actions/product";
import { getTickets } from "./../../actions/ticket";
import { addSale, getSales } from "./../../actions/sale";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  useDisclosure,
  ModalOverlay,
  Icon,
} from "@chakra-ui/react";
import { FiCheck, FiSave, FiSearch } from "react-icons/fi";

const SaleScreen = ({
  getTickets,
  getSales,
  getProducts,
  addSale,
  sale: { sales, s_loading },
  product: { products, loading: p_loading },
  ticket: { tickets, loading },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    num_table: "",
    product: [],
    subtotal: "",
    total: "",
  });
  const [formDataSales, setFormDataSales] = useState({
    sales: [],
  });
  const { sales: sales_loaded } = formDataSales;
  const { num_table, product, subtotal, total } = formData;
  const getProductByID = (id) => {
    return products.find((p) => {
      return p._id === id;
    });
  };
  // const productsName = product.map((id) => {
  //   //
  //   return getProductByID(id);
  // });

  // const [isOpen, setIsOpen] = useState(false);
  // const handleOpen = () => setIsOpen(!isOpen);
  // const closeBtn = (
  //   <button className="close" onClick={handleOpen}>
  //     &times;
  //   </button>
  // );
  const addTicket = ({ product, num_table, subtotal, total }) => {
    //
    // setIsOpen(!isOpen);
    onClose();
    setFormData({
      product,
      num_table,
      subtotal,
      total,
    });
  };

  const registerSale = () => {
    //
    addSale({ num_table: parseInt(num_table) });
    setFormData({
      num_table: "",
      product: [],
      subtotal: "",
      total: "",
    });
  };

  useEffect(() => {
    getSales();
  }, [getSales]);
  useEffect(() => {
    getTickets();
  }, [getTickets]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    if (!s_loading && sales) {
      setFormDataSales({
        sales: sales,
      });
    }
  }, [sales, s_loading]);
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="6">
        Registrar Venta
      </Text>
      <Flex width="full" alignItems="flex-start">
        <Box
          flex="1"
          p="4"
          borderWidth="1px"
          borderRadius="md"
          marginRight="10"
        >
          <FormControl marginBottom="5">
            <FormLabel>Numero de Mesa</FormLabel>
            <Box display="flex">
              <Input
                width="20"
                type="number"
                name="num_table"
                value={num_table}
                readOnly
              />
              <Button onClick={onOpen} ml="2">
                <Icon as={FiSearch} h={4} w={4} alignSelf={"center"} />
              </Button>
            </Box>
          </FormControl>
          <FormControl marginBottom="5">
            <FormLabel>Subtotal</FormLabel>
            <Input type="number" name="subtotal" value={subtotal} readOnly />
          </FormControl>
          <FormControl marginBottom="5">
            <FormLabel>Total</FormLabel>
            <Input type="number" name="total" value={total} readOnly />
          </FormControl>
          <FormControl marginBottom="5">
            <FormLabel>Productos</FormLabel>
            <div className="products-wrapper w-100">
              {/* {
              (!p_loading && productsName) && productsName.map((p,idx) => (<Button key={idx} className="button-badge d-flex justify-content-center w-100" variant="secondary" disabled>
                  {p.name} <Badge className="badge" variant="light"></Badge>
                  <span className="sr-only">unread messages</span>
                </Button>
              ))
            } */}
            </div>
          </FormControl>
          <Box textAlign="right">
            <Button colorScheme="blue" onClick={registerSale}>
              <Icon as={FiSave} h={4} w={4} alignSelf={"center"} mr={2} />
              Guardar
            </Button>
          </Box>
        </Box>
        <Box display="flex" flex="2">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Cajero</Th>
                <Th>Mesa</Th>
                <Th>Total</Th>
                <Th>Fecha</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sales.length > 0 &&
                sales_loaded.map((sale, idx) => (
                  <Tr key={idx}>
                    <Td>{sale.cashier}</Td>
                    <Td>{sale.num_table}</Td>
                    <Td>S/{sale.total}</Td>
                    <Td>{sale.date}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xl" fontWeight="bold" lineHeight="short">
            Buscar ticket
          </ModalHeader>
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Mesa</Th>
                  <Th>Subtotal</Th>
                  <Th>Total</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets.map((ticket, idx) => (
                  <Tr key={idx}>
                    <Td>{ticket.num_table}</Td>
                    <Td>S/{ticket.subtotal.toFixed(2)}</Td>
                    <Td>S/{ticket.total.toFixed(2)}</Td>
                    <Td>
                      <Button
                        onClick={() =>
                          addTicket({
                            num_table: ticket.num_table,
                            subtotal: ticket.subtotal,
                            total: ticket.total,
                            product: ticket.product,
                          })
                        }
                      >
                        <Icon as={FiCheck} h={4} w={4} alignSelf={"center"} />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
SaleScreen.propTypes = {
  getTickets: PropTypes.func.isRequired,
  getSales: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  addSale: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  product: state.product,
  sale: state.sale,
});
export default connect(mapStateToProps, {
  addSale,
  getTickets,
  getSales,
  getProducts,
})(SaleScreen);
