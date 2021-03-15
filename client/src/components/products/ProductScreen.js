import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getProducts} from '../../actions/product'
const ProductScreen = ({getProducts, product:{products,loading}}) => {
  useEffect(()=>{
    getProducts();
  },[getProducts])
  console.log(products)
  return (loading) ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> :
      <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-success'>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className='table-sm '>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>S/. {product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
    </>
  
}
const mapStateToProps = state => ({
  product: state.product
})
export default connect(mapStateToProps,{getProducts})(ProductScreen);