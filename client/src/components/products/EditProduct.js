import React, { useEffect, useState } from 'react'
import {Form, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getProductByID} from '../../actions/product'
const EditProduct = ({getProductByID,product:{products,loading}}) => {
  // const [ formData, setFormData ] = useState({
  //   name_edit:'',
  //   category_edit: '',
  //   price_edit: 0,
  // });
  // const {
  //   name,
  //   category,
  //   price,
  // } = formData;
  // const onChange = e => setFormData({ ...formData,
  //   [e.target.name]:e.target.value
  // });
  const { id } = useParams();
  console.log(id)
  useEffect(async()=>{
    getProductByID(id);
  },[])
  console.log(products)
  const { name, price, category } = products[0];
  return (loading) ?
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner> :
    <div>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Product name</label>
            <br/>
            <Form.Control name="name" value={name}  type="text" />
            <label>Product price</label>
            <br/>
            <Form.Control type="number" step="any" name="price" value={price} />
            <label>Product category</label>
            <br/>
            <Form.Control as="select" 
                          size="sm" 
                          name="category"
                          value={category}
                          
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
          >Insert</button>
          <button className="btn btn-danger" 
          >Cancel</button>
        </ModalFooter>
      </div>
  
}
const mapStateToProps = state => ({
  product: state.product,
  getProductByID: PropTypes.func.isRequired,
})
export default connect(mapStateToProps,{getProductByID})(EditProduct)
