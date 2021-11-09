import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
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
  Icon,
} from "@chakra-ui/react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

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
    description: "",
    category: "",
    price: 0,
    image: "",
  });
  const {
    name,
    description,
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
    addProduct({ name: name.trim(), category, description, price, image });
    setFormData({ name: "", category: "",description:"", price: 0, image: "" });
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
    <Container maxWidth="container.xl" paddingTop="10">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="10"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Lista de Productos
        </Text>
        {/* <Button leftIcon={<FiPlus />} colorScheme="blue" variant="solid">
          Create Product
        </Button> */}
        <Button onClick={onOpen} fontSize="lg" colorScheme="blue">
          <Icon as={FiPlus} h={6} w={6} alignSelf={"center"} mr="2" /> Agregar
          Producto
        </Button>
      </Box>
      <Box>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>NOMBRE</Th>
              <Th>DESCRIPCION</Th>
              <Th>IMAGEN</Th>
              <Th>PRECIO</Th>
              <Th>CATEGORIA</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, idx) => (
              <Tr key={idx}>
                <Td>{product._id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.description}</Td>
                <Td>
                  <Box>
                    <Image
                      boxSize="80px"
                      src={`/images/${product.image}`}
                      alt={product.name}
                    />
                  </Box>
                </Td>
                <Td>S/ {product.price.toFixed(2)}</Td>
                <Td>{product.category}</Td>
                <Td>
                  <Button
                    as={ReachLink}
                    to={`/products/edit/${product._id.toString()}`}
                  >
                    <Icon as={FiEdit} h={4} w={4} alignSelf={"center"} />
                  </Button>
                  <Button ml="2" onClick={(e) => deleteProduct(product._id)}>
                    <Icon as={FiTrash2} h={4} w={4} alignSelf={"center"} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={1}>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={name}
                type="text"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl mt={1}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={description}
                type="text"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Precio</FormLabel>
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
              <FormLabel>Imagen</FormLabel>
              <Input
                type="file"
                label={image}
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Categoria</FormLabel>
              <Select
                as="select"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
              >
                <option value="">-- Selecciona una categoria --</option>
                <option value="dishes">Platos</option>
                <option value="drinks">Bebidas</option>
                <option value="salads">Ensaladas</option>
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
                No hay imagen previa
              </Text>
              {!uploading ? (
                imagePicked
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Cargando...</span>
                </Spinner>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitProduct}>
              Agregar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
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
