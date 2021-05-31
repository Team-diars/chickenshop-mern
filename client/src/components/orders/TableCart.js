import React from 'react'
import PropTypes from 'prop-types'
import {addTicket} from '../../actions/ticket'
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap'

const TableCart = ({cart,num_table,addTicket}) => {
  
  const saveTicket = () => {
    const data = cart.map(item => {
      console.log("item > ",item)
      // return {_id:item.dish_id, quantity:item.dish_quantity} || 
      //       {_id:item.drink_id, quantity:item.drink_quantity} ||
      //       {_id:item.salad_id, quantity:item.salad_quantity}
    })
    console.log(data);
    // addTicket({
    //   num_table,
    // })
  }
  return (
    <div>
      <Table bordered striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((dish,idx) => (
              <tr key={idx}>
                <th>{dish.dish_name ?? dish.drink_name ?? dish.salad_name}</th>
                <th>{dish.dish_quantity ?? dish.drink_quantity ?? dish.salad_quantity}</th>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Button type="submit" className='btn-secondary add-button' onClick={saveTicket}>
        Add Order <i class="fas fa-cart-plus"></i>
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
