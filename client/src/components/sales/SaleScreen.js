import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import {getProducts} from '../../actions/product'
import {getTickets} from '../../actions/ticket'
import {addSale,getSales} from '../../actions/sale'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const SaleScreen = ({getTickets,getSales,getProducts,addSale,sale:{sales,s_loading},product:{products,loading:p_loading},ticket:{tickets,loading}}) => {
  const [formData, setFormData] = useState({
    num_table:"",
    product:[],
    subtotal:"",
    total:""
  });
  const [formDataSales, setFormDataSales] = useState({
    sales: [],
  }) 
  const {sales:sales_loaded} = formDataSales;
  const {num_table,product,subtotal,total} = formData;
  const getProductByID = (id) => {
    return products.find(p => {
      console.log(p._id);
      return p._id === id
    });
  }
  const productsName = product.map((id) => {
    // console.log(id);
    return getProductByID(id)
  });
  console.log('filtered: ',productsName);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const closeBtn = <button className="close" onClick={handleOpen}>&times;</button>;
  const addTicket = ({product,num_table,subtotal,total}) => {
    //console.log({product,num_table,subtotal,total});
    setIsOpen(!isOpen);
    setFormData({
      product,
      num_table,
      subtotal,
      total
    })
  }
  
  const registerSale = () => {
    //console.log("table: ",num_table)
    addSale({num_table:parseInt(num_table)});
    setFormData({
      num_table:"",
      product:[],
      subtotal:"",
      total:""
    })
  }
  
  useEffect(() => {
    getSales();
  },[getSales])
  useEffect(() => {
    getTickets();
  },[getTickets])
  useEffect(() => {
    getProducts();
  },[getProducts])
  useEffect(() => {
    if(!s_loading && sales){
      setFormDataSales({
        sales:sales
      })
    }
  },[sales,s_loading]);
  return (
    <div className="container">
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
            {/* {
              (!p_loading && productsName) && productsName.map((p,idx) => (<Button key={idx} className="button-badge d-flex justify-content-center w-100" variant="secondary" disabled>
                  {p.name} <Badge className="badge" variant="light"></Badge>
                  <span className="sr-only">unread messages</span>
                </Button>
              ))
            } */}
            </div>
          </div>
          <div className="p-0 col-12 col-md-12">
            <Button className="btn-search btn btn-success" onClick={registerSale}>
              <i className="fas fa-cash-register mr-2"></i>
              Register Sale
            </Button>
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="table-wrapper">
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
                {
                  (s_loading && !sales_loaded) ? 
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner> :
                  sales_loaded.map((sale,idx) => (
                    <tr key={idx}>
                      <td>{sale.cashier}</td>
                      <td>{sale.num_table}</td>
                      <td>S/.{sale.total}</td>
                      <td>{sale.date}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
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
                    <td>S/.{ticket.subtotal}</td>
                    <td>S/.{ticket.total}</td>
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
    </div>
  )
}
SaleScreen.propTypes = {
  getTickets: PropTypes.func.isRequired,
  getSales: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  addSale: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ticket: state.ticket,
  product: state.product,
  sale: state.sale,
})
export default connect(mapStateToProps,{addSale,getTickets,getSales,getProducts})(SaleScreen)
