import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getProducts, addProduct, deleteProduct } from "../../actions/product";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Container,
  ModalOverlay,
  Modal,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormControl,
  Input,
  FormLabel,
  Select,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";

const ProductScreen = ({
  addProduct,
  getProducts,
  deleteProduct,
  product: { products, loading },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
  });
  const {
    name,
    category,
    price,
    // image,
  } = formData;
  //Set Image empty when closing popup
  // const handleOpen = () => {
  //   !isOpen && setImage("");
  //   setIsOpen(!isOpen);
  // };
  const submitProduct = () => {
    addProduct({ name: name.trim(), category, price, image });
    setFormData({ name: "", category: "", price: 0, image: "" });
    setImage("");
    // setIsOpen(!isOpen);
    onClose();
  };
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <img src={`/images/${image}`} alt={image} className="image-picked" />
  );
  return (
    <Container maxWidth="container.xl">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Products
        </Text>
        <Button onClick={onOpen}>
          <i className="fas fa-plus"></i> Create Product
        </Button>
      </Box>
      <Box>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <div>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>IMAGE</Th>
                  <Th>PRICE</Th>
                  <Th>CATEGORY</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, idx) => (
                  <Tr key={idx}>
                    <Td>{product._id}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <Box>
                        <Image
                          boxSize="80px"
                          src={`/images/${product.image}`}
                          alt={product.name}
                        />
                      </Box>
                    </Td>
                    <Td>S/. {product.price}</Td>
                    <Td>{product.category}</Td>
                    <Td>
                      <LinkContainer to={`/products/edit/${product._id}`}>
                        <Button variant="warning" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={(e) => deleteProduct(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={1}>
              <FormLabel>Product name</FormLabel>
              <Input
                name="name"
                value={name}
                type="text"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Product price</FormLabel>
              <Input
                type="number"
                step="any"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Product Image</FormLabel>
              <Input
                type="file"
                label={image}
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Product category</FormLabel>
              <Select
                as="select"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
              >
                <option value="">-- Select a category --</option>
                <option value="dishes">Dishes</option>
                <option value="drinks">Drinks</option>
                <option value="salads">Salads</option>
              </Select>
            </FormControl>
            <Box
              mt="2"
              py="1"
              px="2"
              style={{ background: image ? "#181818" : "#eee" }}
            >
              <Text
                fontWeight="semibold"
                style={{ display: (uploading || image) && "none" }}
              >
                No preview image was set
              </Text>
              {!uploading ? (
                imagePicked
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitProduct}>
              Insert
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
});
ProductScreen.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  getProducts,
  addProduct,
  deleteProduct,
})(ProductScreen);
