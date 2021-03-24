import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, ModalBody, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getProducts} from '../../actions/product'
import {Modal} from 'reactstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const ProductScreen = ({getProducts, product:{products,loading}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ formData, setFormData ] = useState({
    name:'',
    category: '',
    price: '',
  });
  const {
    name,
    category,
    price,
  } = formData;
  const handleOpen = () =>{
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    getProducts();
  },[getProducts])
  const onChange = e => setFormData({ ...formData,
                                      [e.target.name]:e.target.value
                                    });
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
            <Button className='my-3 btn-success' onClick={handleOpen}>
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
      <Modal isOpen={isOpen}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product name</label>
            <br/>
            <input type="text" 
                    name="name" 
                    className="form-control"
                    value={name}
                    onChange={(e) => onChange(e)}
            />
            <label>Product price</label>
            <br/>
            <input type="number" 
                    name="price"
                    className="form-control" 
                    value={price}
                    onChange={(e) => onChange(e)}
            />
            <label>Product category</label>
            <br/>
            <Form.Control as="select" 
                          size="sm" 
                          name="category"
                          value={category}
                          onChange={(e) => onChange(e)}
                          custom 
                          >
              <option value="dishes">Dishes</option>
              <option>Drinks</option>
            </Form.Control>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" 
                  // onClick={postMethod}
          >Insert</button>
          <button className="btn btn-danger" 
                  onClick={handleOpen}
          >Cancel</button>
        </ModalFooter>
      </Modal>
    </>
}
const mapStateToProps = state => ({
  product: state.product
})
export default connect(mapStateToProps,{getProducts})(ProductScreen);