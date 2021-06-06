import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import {getTickets} from '../../actions/ticket'
import {connect} from 'react-redux';
const MainTable = ({getTickets,ticket:{tickets,loading}}) => {
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
              <tr key={idx}>
                <td>{ticket.cashier}</td>
                <td>{ticket.num_table}</td>
                <td>{ticket.subtotal}</td>
                <td>{ticket.total}</td>
                <td>
                  <Button className='btn-warning btn-sm'>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button className='btn-danger btn-sm'>
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
}

const mapStateToProps = state => ({
  ticket: state.ticket
})

export default connect(mapStateToProps,{getTickets})(MainTable)