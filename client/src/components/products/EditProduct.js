import React, { useEffect, useState } from "react";
import { Form, ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductByID, updateProduct } from "../../actions/product";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Select, Button, FormLabel, Text, Box } from "@chakra-ui/react";

const EditProduct = ({
  history,
  getProductByID,
  updateProduct,
  product: { product, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    description: "",
    category: "",
    price: 0,
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const getProduct = (id) => {
    getProductByID(id);
  };
  useEffect(() => {
    getProduct(match.params.id);
  }, [match.params.id]);
  useEffect(() => {
    if (!loading && product) {
      setFormData({
        _id: product._id || "",
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || 0,
        image: setImage(product.image) || "",
      });
    }
  }, [product, loading]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error.response);
      setUploading(false);
    }
  };
  const imagePicked = image && (
    <img src={`/images/${image}`} alt={image} className="image-picked" style={{width:"20%"}}/>
  );

  return (
    <>
      <ModalHeader>Edit Product</ModalHeader>
      {loading ? (
        <div className="container p-5 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <>
          <ModalBody style={{width:"50%"}}>
            <div className="form-group">
              <FormLabel>Product name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                type="text"
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                type="text"
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Product price</FormLabel>
              <Input
                type="number"
                step="any"
                name="price"
                value={formData.price}
                onChange={(e) => onChange(e)}
              />
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                label={image}
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              />
              <FormLabel>Product category</FormLabel>
              <Select
                as="select"
                name="category"
                value={formData.category}
                onChange={(e) => onChange(e)}
              >
                <option value="">-- Select a category --</option>
                <option value="dishes">Dishes</option>
                <option value="drinks">Drinks</option>
              </Select>
              <Box
                mt="2"
                py="1"
                px="2"
                style={{ background: image ? "#181818" : "#eee" }}
              >
                {/* <Text
                  fontWeight="semibold"
                  style={{ display: uploading && "none" }}
                >
                  No preview image was set
                </Text> */}
                {!uploading ? (
                  imagePicked
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
              </Box>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={() => updateProduct(match.params.id, formData, history)}
            >
              Update
            </Button>
            <Link to="/products" className="btn btn-danger">
              Cancel
            </Link>
          </ModalFooter>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
});
EditProduct.propTypes = {
  getProductByID: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getProductByID, updateProduct })(
  EditProduct
);
