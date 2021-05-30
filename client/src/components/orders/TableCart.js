import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

const TableCart = ({cart}) => {
  const {dish_name,dish_quantity} = cart;
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
                <th>{dish.dish_name}</th>
                <th>{dish.dish_quantity}</th>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

TableCart.propTypes = {

}

export default TableCart
