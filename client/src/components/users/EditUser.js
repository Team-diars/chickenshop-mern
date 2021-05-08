import React, { useEffect, useState } from 'react'
import {Button, Form, ModalBody, ModalFooter, Spinner } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getUserByID,updateUser} from '../../actions/user'
import { Link } from 'react-router-dom';
const EditUser = ({history,getUserByID,user:{user,loading},match}) => {
  const [ formData, setFormData ] = useState({
    _id: null,
    password: "",
  });
  const getUser = (id) =>{
    getUserByID(id);
  }
  useEffect(()=>{
    getUser(match.params.id);
  },[match.params.id]);
  useEffect(() => {
    if(!loading && user){
      setFormData({
        _id: user._id || "",
        password: user.name || "",
      });
    }
  },[user,loading]);
  const onChange = e => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData,
      [name]:type === "number" ? parseInt(value) : value
    });
  }
  return (
    <>
      <ModalHeader>Edit User</ModalHeader>
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
                <label>User name</label>
                <br/>
                <Form.Control name="name" value={formData.name} type="text" onChange={ (e) => onChange(e)}/>
                <label>Password</label>
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
EditUser.propTypes = {
  getProductByID: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{getUserByID,updateUser})(EditUser)
