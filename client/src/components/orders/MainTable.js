import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { getTickets, deleteTicket } from "../../actions/ticket";
import { connect } from "react-redux";
import { Box, Button, Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";

const MainTable = ({
  getTickets,
  deleteTicket,
  ticket: { tickets, loading },
}) => {
  useEffect(() => {
    getTickets();
  }, [getTickets]);
  return (
    <Box>
      <Table variant="striped" size="lg">
        <Thead>
          <Tr>
            <Th>Cajero</Th>
            <Th>Mesa</Th>
            <Th>Subtotal</Th>
            <Th>Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.map(
            (ticket, idx) =>
              !ticket.hasPaid && (
                <Tr key={idx}>
                  <Td>{ticket.cashier}</Td>
                  <Td>{ticket.num_table}</Td>
                  <Td>{ticket.subtotal}</Td>
                  <Td>{ticket.total}</Td>
                  <Td>
                    {/* <LinkContainer to={`/orders/edit/${ticket._id}`}>
                    <Button className='btn-warning btn-sm'>
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer> */}
                    <Button onClick={(e) => deleteTicket(ticket._id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

MainTable.propTypes = {
  getTickets: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getTickets, deleteTicket })(
  MainTable
);
