import React from 'react'
import PropTypes from 'prop-types'
import {addTicket} from '../../actions/ticket'
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap'

const TableCart = ({cart,num_table,addTicket}) => {
  
  const saveTicket = () => {
    const data = cart.map(item => {
      return item
    })
    addTicket({
      num_table,
      product: data
    })
  }
  return (
    <div>
      <Table bordered striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((dish,idx) => (
              <tr key={idx}>
                <th>{dish.dish_name ?? dish.drink_name ?? dish.salad_name}</th>
                <th>{dish.dish_quantity ?? dish.drink_quantity ?? dish.salad_quantity}</th>
                <th>
                  <Button className='btn-danger btn-sm'>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Button type="submit" className='btn-secondary add-button' onClick={saveTicket}>
        Add Order <i className="fas fa-cart-plus"></i>
      </Button>
    </div>
  )
}

TableCart.propTypes = {
  addTicket: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ticket: state.ticket,
})

export default connect(mapStateToProps,{addTicket})(TableCart)
