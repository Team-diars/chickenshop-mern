import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import {getTickets} from '../../actions/ticket'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const SaleScreen = ({getTickets,ticket:{tickets,loading}}) => {
  const [formData, setFormData] = useState({
    num_table:"",
    product:[],
    subtotal:"",
    total:""
  });
  const {num_table,product,subtotal,total} = formData;
  console.log("tickets > ",tickets);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const closeBtn = <button className="close" onClick={handleOpen}>&times;</button>;
  const addTicket = ({product,num_table,subtotal,total}) => {
    console.log({product,num_table,subtotal,total});
    setIsOpen(!isOpen);
    setFormData({
      product,
      num_table,
      subtotal,
      total
    })
  }
  useEffect(() => {
    getTickets();
  },[getTickets])
  return (
    <>
      <div className="m-0 col-lg-12">
        <h1>Sales</h1>
      </div>
      <div className="m-0 p-0 row col-lg-12">
        <div className="col-md-6 row m-0">
          <div className="d-flex flex-column justify-content-end p-0 col-10 col-md-10">
            <label>Table number</label>
            <Form.Control type="number"
                        name="num_table"
                        value={num_table}
                        readOnly
                        />
          </div>
          <div className="p-0 col-2 col-md-2 d-flex justify-content-start align-items-center">
            <Button className="btn-search btn btn-secondary" onClick={handleOpen}>
              <i className="fas fa-search"></i>
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-end p-0 col-12 col-md-6">
            <label>Subtotal</label>
            <Form.Control type="number"
                        name="subtotal"
                        value={subtotal}
                        readOnly
                        />
          </div>
          <div className="d-flex flex-column justify-content-end p-0 col-12 col-md-6">
            <label>Total</label>
            <Form.Control type="number"
                        name="total"
                        value={total}
                        readOnly
                        />
          </div>
          <div className="p-0 col-12 col-md-12 mb-2">
            <label>Products</label>
            <div className="products-wrapper w-100">
            {
              product.map((p,idx) => (
                <Button  key={idx} className="button-badge d-flex justify-content-center w-100" variant="secondary" disabled>
                  {p.name} <Badge className="badge" variant="light">{p.quantity}</Badge>
                  <span className="sr-only">unread messages</span>
                </Button>
              ))
            }
            </div>
          </div>
          <div className="p-0 col-12 col-md-12">
            <Button className="btn-search btn btn-success">
              <i className="fas fa-cash-register mr-2"></i>
              Register Sale
            </Button>
          </div>
        </div>
        <div className="col-md-6 ">
          <Table bordered striped hover responsive>
            <thead>
              <tr>
                <th>Cashier</th>
                <th>Table</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hector Herrera</td>
                <td>15</td>
                <td>450</td>
                <td>06/01/2021</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen}>
        <ModalHeader close={closeBtn}>Search Ticket</ModalHeader>
        <ModalBody>
          <div className="ticket-table">
            <Table bordered striped hover responsive size="sm">
              <thead>
                <tr>
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
                      <td>{ticket.num_table}</td>
                      <td>{ticket.subtotal}</td>
                      <td>{ticket.total}</td>
                      <td>
                        <Button className='btn-success btn-sm' 
                                onClick={() => addTicket({num_table:ticket.num_table,
                                                    subtotal:ticket.subtotal,
                                                    total:ticket.total,
                                                    product:ticket.product})}>
                          <i className="fas fa-check"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
          
        </ModalBody>
        
      </Modal>
    </>
  )
}
SaleScreen.propTypes = {
  getTickets: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ticket: state.ticket
})
export default connect(mapStateToProps,{getTickets})(SaleScreen)
