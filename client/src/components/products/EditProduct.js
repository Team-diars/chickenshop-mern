import React, { useEffect, useState } from 'react'
import {Button, Form, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getProductByID,updateProduct} from '../../actions/product'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { profile_url } from 'gravatar';
const EditProduct = ({history,getProductByID,updateProduct,product:{products,loading},match}) => {
  const {_id,name,category,price} = products;
  // console.log(products)
  const [ formData, setFormData ] = useState({
    _id: null,
    name: "",
    category: "",
    price: 0,
  });
  
  const dispatch = useDispatch();
  const getProduct = (id) =>{
    getProductByID(id);
  }
  useEffect(()=>{
    getProduct(match.params.id);
  },[match.params.id]);

  useEffect(() => {
    setFormData({
      _id: products._id,
      name: products.name,
      category: products.category,
      price: products.price
    });
  },[products])
  const onChange = e => setFormData({ 
    ...formData,
    [e.target.name]:e.target.value
  });
  
  const updatingProduct = (e) =>{
    e.preventDefault();
    // updateProduct(formData._id,formData);
  }

  
  return (loading) ?
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner> :
    <Form onSubmit={updatingProduct}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product name</label>
            <br/>
            <Form.Control name="name" value={formData.name} type="text" onChange={ (e) => onChange(e)}/>
            <label>Product price</label>
            <br/>
            <Form.Control name="price" step="any" type="number" value={formData.price} onChange={ (e) => onChange(e)}/>
            <label>Product category</label>
            <br/>
            <Form.Control as="select" 
                          size="sm" 
                          name="category"
                          value={formData.category}
                          onChange={ (e) => onChange(e)}
                          custom 
                          >
              <option>-- Select a category --</option>
              <option value="dishes">Dishes</option>
              <option value="drinks">Drinks</option>
            </Form.Control>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
              type="submit"
              variant='warning'
              className='btn-sm'
              >
                Update
          </Button>
          <Link to="/products" className="btn btn-danger">
            Cancel
          </Link>
        </ModalFooter>
      </Form>
  
}
const mapStateToProps = state => ({
  product: state.product,
  getProductByID: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
})
export default connect(mapStateToProps,{getProductByID,updateProduct})(EditProduct)
