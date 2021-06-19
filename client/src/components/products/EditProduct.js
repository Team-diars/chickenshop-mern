import React, { useEffect, useState } from 'react'
import { Button, Form, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getProductByID,updateProduct} from '../../actions/product'
import { Link } from 'react-router-dom';
import axios from 'axios'
const EditProduct = ({history,getProductByID,updateProduct,product:{product,loading},match}) => {
  const [ formData, setFormData ] = useState({
    _id: null,
    name: "",
    category: "",
    price: 0,
    image:""
  });
  const [uploading, setUploading] = useState(false)
  const [image,setImage] = useState('');
  const getProduct = (id) =>{
    getProductByID(id);
  }
  useEffect(()=>{
    getProduct(match.params.id);
  },[match.params.id]);
  useEffect(() => {
    if(!loading && product){
      setFormData({
        _id: product._id || "",
        name: product.name || "",
        category: product.category || "",
        price: product.price || 0,
        image: setImage(product.image) || ""
      });
    }
  },[product,loading]);
  const onChange = e => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData,
      [name]:type === "number" ? parseInt(value) : value
    });
  }
  
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
    <>
      <ModalHeader>Edit Product</ModalHeader>
      {
        (loading) ? 
          <div className="container p-5 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div> :
          <>
            <ModalBody>
              <div className="form-group">
                <label>Product name</label>
                <br/>
                <Form.Control name="name" value={formData.name} type="text" onChange={ (e) => onChange(e)}/>
                <label>Product price</label>
                <br/>
                <Form.Control type="number" step="any" name="price" value={formData.price} onChange={(e) => onChange(e)}/>
                <label>Product Image</label>
                <br/>
                <Form.File type="file" label={image} custom name="image" className="form-control image-input" accept="image/*" onChange={uploadFileHandler}/>
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
              <div className="bg-preview-image">
              <p className="bg-text" style={{display:(uploading) && "none"}}>No preview image was set</p>
              {
                (!uploading) ? imagePicked : <Spinner animation="border" role="status">
                                              <span className="sr-only">Loading...</span>
                                            </Spinner>
              }
            </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
                type="submit"
                variant='warning'
                className='btn'
                onClick={() => updateProduct(match.params.id,formData,history)}
                >
                  Update
            </Button>
            <Link to="/products" className="btn btn-danger">
              Cancel
            </Link>
          </ModalFooter>
        </>
      }
    </>
  )
}
const mapStateToProps = state => ({
  product: state.product,
})
EditProduct.propTypes = {
  getProductByID: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getProductByID,updateProduct})(EditProduct)
