import React, { useState } from 'react'
import { Modal, Button, Col, Form, ModalBody, ModalFooter, Row, Spinner, Table } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const EditProduct = () => {
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
  const onChange = e => setFormData({ ...formData,
    [e.target.name]:e.target.value
  });
  return (
    <h1>Edit Product</h1>
  )
}

export default EditProduct
