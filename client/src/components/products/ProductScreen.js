import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Form, Image, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getProducts,addProduct,deleteProduct} from '../../actions/product'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
//import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import PropTypes from 'prop-types';
import axios from 'axios'

const ProductScreen = ({addProduct,getProducts,deleteProduct, product:{products,loading}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false)
  const [image,setImage] = useState('');
  const [ formData, setFormData ] = useState({
    name:'',
    category: '',
    price: 0,
    image:''
  });
  const {
    name,
    category,
    price,
    // image,
  } = formData;
  //Set Image empty when closing popup
  const handleOpen = () => {
    (!isOpen) && setImage('');
    setIsOpen(!isOpen);
  }
  const submitProduct = () => {
    addProduct({ name:name.trim(),category,price,image });
    setFormData({name:'',category:'',price:0,image:''})
    setImage('')
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    getProducts();
  },[getProducts])
  const onChange = e => setFormData({ ...formData,
                                      [e.target.name]:e.target.value
                                    });
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      console.log('image > ',data);
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error.response)
      setUploading(false)
    }
  }
  const imagePicked = (image) && <img src={`/images/${image}`} alt={image} className="image-picked" />
  return (
      <div className="container">
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
      <div className="">
      {
        (loading) ? 
          <Spinner animation="border" role="status">
                  <span className="sr-only"></span>
          </Spinner> :
          <div className="product-table-wrapper">
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              products.map((product,idx) => (
                <tr key={idx}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <Image src={`/images/${product.image}`} alt={product.name} className="product-image" />
                  </td>
                  <td>S/. {product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/products/edit/${product._id}`}>
                      <Button variant='warning' className='btn-sm'>
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
              ))
            }
            </tbody>
          </Table>
          </div>
      }
      </div>
      <Modal isOpen={isOpen}>
        <ModalHeader>
          <h3>Add Product</h3>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product name</label>
            <br/>
            <Form.Control name="name" value={name} type="text" onChange={(e) => onChange(e)} autoComplete="off"/>
            <label>Product price</label>
            <br/>
            <Form.Control type="number" step="any" name="price" value={price} onChange={(e) => onChange(e)} autoComplete="off"/>
            <label>Product Image</label>
            <br/>
            <Form.File type="file" label={image} custom name="image" className="form-control image-input" accept="image/*" onChange={uploadFileHandler}/>

            <label>Product category</label>
            <br/>
            <Form.Control as="select" 
                          size="sm" 
                          name="category"
                          value={category}
                          onChange={(e) => onChange(e)}
                          custom 
                          >
              <option value="">-- Select a category --</option>
              <option value="dishes">Dishes</option>
              <option value="drinks">Drinks</option>
              <option value="salads">Salads</option>
            </Form.Control>
            <div className="bg-preview-image" style={{background: (image) ? "#181818" : "#eee"}}>
              <p className="bg-text" style={{display:(uploading || image) && "none"}}>No preview image was set</p>
              {
                (!uploading) ? imagePicked : <Spinner animation="border" role="status">
                                              <span className="sr-only">Loading...</span>
                                            </Spinner>
              }
            </div>
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
    </div>
  )
}
const mapStateToProps = state => ({
  product: state.product,
})
ProductScreen.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getProducts,addProduct,deleteProduct})(ProductScreen);