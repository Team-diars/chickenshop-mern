import React from 'react'
import { useEffect } from 'react';
import {getTicketByID} from '../../actions/ticket'
import {getProducts} from '../../actions/product'
import { Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const EditOrder = ({getTicketByID,getProducts,ticket:{ticket,loading:t_loading},product:{products,loading:p_loading},match}) => {
  const updateTicket = () => {
    console.log("Updated!!");
  }
  
  const getProductByID = (id) => {
    return (!p_loading) && products.find(p => p._id === id);
  }
  const productsName = (!t_loading && ticket) && ticket.product.map((id) => {
    return getProductByID(id) || false
  });
  
  console.log('filtered: ',productsName);

  const getTicket = (id) => {
    getTicketByID(id);
  }

  useEffect(() => {
    getProducts();
  },[getProducts])
  useEffect(()=>{
    getTicket(match.params.id);
  },[match.params.id]);
  return (
    <>
      <div className="tablecar-wrapper">
        <div className="tablecar-wrapper">
          <Table bordered striped hover responsive size="sm">
            <thead>
              <tr>
                <th>Item</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              (!t_loading && productsName) && productsName.map((p,idx) => (
                <tr key={idx}>
                  <td>{p.name}</td>
                  <td>
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
      </div>
      <Button type="submit" className='btn-secondary add-button' onClick={updateTicket}>
          Update Order <i className="fas fa-cart-plus"></i>
      </Button>
      <Link to="/orders" className="btn btn-danger">
        Cancel
      </Link>
    </>
  )
}

const mapStateToProps = state => ({
  ticket: state.ticket,
  product: state.product,
})

export default connect(mapStateToProps,{getTicketByID,getProducts})(EditOrder);