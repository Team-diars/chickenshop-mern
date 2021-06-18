import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import {getTickets,deleteTicket} from '../../actions/ticket'
import {connect} from 'react-redux';
const MainTable = ({getTickets,deleteTicket,ticket:{tickets,loading}}) => {
  console.log(tickets);
  useEffect(() => {
    getTickets();
  },[getTickets])
  return (
    <div className="maintable-wrapper">
      <Table bordered striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Cashier</th>
            <th>Table</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            tickets.map((ticket,idx) => (
              (!ticket.hasPaid) && <tr key={idx}>
                <td>{ticket.cashier}</td>
                <td>{ticket.num_table}</td>
                <td>{ticket.subtotal}</td>
                <td>{ticket.total}</td>
                <td>
                  <LinkContainer to={`/orders/edit/${ticket._id}`}>
                    <Button className='btn-warning btn-sm'>
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button className='btn-danger btn-sm' onClick={e => deleteTicket(ticket._id)}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

MainTable.propTypes = {
  getTickets: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ticket: state.ticket
})

export default connect(mapStateToProps,{getTickets,deleteTicket})(MainTable)