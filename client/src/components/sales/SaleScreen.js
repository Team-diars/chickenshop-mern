import React, { useEffect, useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { getProducts } from "../../actions/product";
import { getTickets } from "../../actions/ticket";
import { addSale, getSales } from "../../actions/sale";
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
  ModalFooter,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";

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
      console.log(p._id);
      return p._id === id;
    });
  };
  const productsName = product.map((id) => {
    // console.log(id);
    return getProductByID(id);
  });
  console.log("filtered: ", productsName);
  // const [isOpen, setIsOpen] = useState(false);
  // const handleOpen = () => setIsOpen(!isOpen);
  // const closeBtn = (
  //   <button className="close" onClick={handleOpen}>
  //     &times;
  //   </button>
  // );
  const addTicket = ({ product, num_table, subtotal, total }) => {
    //console.log({product,num_table,subtotal,total});
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
    //console.log("table: ",num_table)
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
    <Container maxWidth="container.xl">
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Sales
      </Text>
      <Flex width="full" flexDirection="row" wrap="wrap">
        <Box display="flex" flex="1" flexDirection="column" px="4">
          <FormControl>
            <FormLabel>Table number</FormLabel>
            <Input type="number" name="num_table" value={num_table} readOnly />
          </FormControl>
          <FormControl>
            <Button className="btn-search btn btn-secondary" onClick={onOpen}>
              <i className="fas fa-search"></i>
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel>Subtotal</FormLabel>
            <Input type="number" name="subtotal" value={subtotal} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Total</FormLabel>
            <Input type="number" name="total" value={total} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Products</FormLabel>
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
          <Button className="btn-search btn btn-success" onClick={registerSale}>
            <i className="mr-2 fas fa-cash-register"></i>
            Register Sale
          </Button>
        </Box>
        <Box display="flex" flex="2">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Cashier</Th>
                <Th>Table</Th>
                <Th>Total</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {s_loading && !sales_loaded ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only"></span>
                </Spinner>
              ) : (
                sales_loaded.map((sale, idx) => (
                  <Tr key={idx}>
                    <Td>{sale.cashier}</Td>
                    <Td>{sale.num_table}</Td>
                    <Td>S/.{sale.total}</Td>
                    <Td>{sale.date}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Ticket</ModalHeader>
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Table</Th>
                  <Th>Subtotal</Th>
                  <Th>Total</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets.map((ticket, idx) => (
                  <Tr key={idx}>
                    <Td>{ticket.num_table}</Td>
                    <Td>S/.{ticket.subtotal}</Td>
                    <Td>S/.{ticket.total}</Td>
                    <Td>
                      <Button
                        className="btn-success btn-sm"
                        onClick={() =>
                          addTicket({
                            num_table: ticket.num_table,
                            subtotal: ticket.subtotal,
                            total: ticket.total,
                            product: ticket.product,
                          })
                        }
                      >
                        <i className="fas fa-check"></i>
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
