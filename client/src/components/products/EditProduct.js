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
import store from "../../store";
const EditProduct = ({history,getProductByID,updateProduct,product:{product,loading},match}) => {
  const [ formData, setFormData ] = useState({
    _id: null,
    name: "",
    category: "",
    price: 0,
  });
  const getProduct = (id) =>{
    getProductByID(id);
  }
  useEffect(()=>{
    getProduct(match.params.id);
  },[match.params.id]);
  useEffect(() => {
    if(!loading && product){
      console.log("Product >",product)
      setFormData({
        _id: product._id || "",
        name: product.name || "",
        category: product.category || "",
        price: product.price || 0
      });
    }
  },[product,loading])
  const onChange = e => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData,
      [name]:type === "number" ? parseInt(value) : value
    });
  }
  return (!loading) ?
    <>
      <ModalHeader>Edit Product</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Product name</label>
          <br/>
          <Form.Control name="name" value={formData.name} type="text" onChange={ (e) => onChange(e)}/>
          <label>Product price</label>
          <br/>
          <Form.Control type="number" step="any" name="price" value={formData.price} onChange={(e) => onChange(e)}/>
          <label>Product category</label>
          <br/>
          <Form.Control as="select" 
                        size="sm" 
                        name="category"
                        value={formData.category}
                        onChange={ (e) => onChange(e)}
                        custom 
                        >
            <option value="">-- Select a category --</option>
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
            onClick={() => updateProduct(match.params.id,formData,history)}
            >
              Update
        </Button>
        <Link to="/products" className="btn btn-danger">
          Cancel
        </Link>
      </ModalFooter>
    </>:
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      
}
const mapStateToProps = state => ({
  product: state.product,
  getProductByID: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
})
export default connect(mapStateToProps,{getProductByID,updateProduct})(EditProduct)
