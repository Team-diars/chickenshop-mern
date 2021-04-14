import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, ModalBody, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getProducts,addProduct,deleteProduct} from '../../actions/product'
import {Modal} from 'reactstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import PropTypes from 'prop-types'
const ProductScreen = ({addProduct,getProducts,deleteProduct, product:{products,loading}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalEdit, setModalEdit]= useState(false);
  const [modalDelete, setModalDelete]= useState(false);

  const [ formData, setFormData ] = useState({
    name:'',
    category: '',
    price: 0,
  });
  const {
    name,
    category,
    price,
  } = formData;
  const handleOpen = () => setIsOpen(!isOpen);
  const submitProduct = (e) => {
    // e.preventDefault();
    addProduct({ name,category,price });
    setFormData({name:'',category:'',price:0})
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
            {products.map((product,idx) => (
              <tr key={idx}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>S/. {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/products/edit/${product._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={e => deleteProduct(product._id)}
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
            <Form.Control name="name" value={name}  type="text" onChange={(e) => onChange(e)}/>
            <label>Product price</label>
            <br/>
            <Form.Control type="number" step="any" name="price" value={price} onChange={(e) => onChange(e)}/>
            <label>Product category</label>
            <br/>
            <Form.Control as="select" 
                          size="sm" 
                          name="category"
                          value={category}
                          onChange={(e) => onChange(e)}
                          custom 
                          >
              <option>-- Select a category --</option>
              <option value="dishes">Dishes</option>
              <option value="drinks">Drinks</option>
            </Form.Control>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" 
                  onClick={submitProduct}
          >Insert</button>
          <button className="btn btn-danger" 
                  onClick={handleOpen}
          >Cancel</button>
        </ModalFooter>
      </Modal>
    </>
}
const mapStateToProps = state => ({
  product: state.product,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
})
export default connect(mapStateToProps,{getProducts,addProduct,deleteProduct})(ProductScreen);