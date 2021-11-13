import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductByID, updateProduct } from "../../actions/product";
import axios from "axios";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  Icon,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { FiArrowLeft, FiFile } from "react-icons/fi";
import { Loader } from "./../../components/loader/Loader";

const EditProduct = ({
  history,
  getProductByID,
  updateProduct,
  product: { product, loading },
  match,
}) => {
  const imageRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    description: "",
    category: "",
    price: 0,
    image: "",
  });
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
        image: setImage(product.image) || "noimage",
      });
    }
  }, [product, loading]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value).toFixed(2) : value,
    });
  };

  const uploadFileHandler = async (e) => {
    console.log(e.currentTarget.files[0]);
    const file = e.target.files[0];
    if (file) {
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
    }
  };
  console.log(formData);
  return (
    <Container paddingY="10">
      <Box
        display="flex"
        alignItems="center"
        marginBottom="6"
        position="relative"
      >
        <Button as={ReachLink} to="/products" mr={[3, 5]} variant="ghost">
          <Icon as={FiArrowLeft} h={[5, 6]} w={[5, 6]} alignSelf={"center"} />
        </Button>
        <Text
          fontSize="2xl"
          textAlign="center"
          fontWeight="bold"
          lineHeight="short"
        >
          Editar Producto
        </Text>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box p="4" borderWidth="1px" borderRadius="md">
            <FormControl marginBottom="3">
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={formData.name}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Descripcion</FormLabel>
              <Input
                name="description"
                value={formData.description}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Precio</FormLabel>
              <InputGroup>
                <InputLeftAddon children="S/" />
                <Input
                  type="number"
                  step="any"
                  name="price"
                  value={formData.price}
                  onChange={(e) => onChange(e)}
                />
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Categoria</FormLabel>
              <Select
                as="select"
                name="category"
                value={formData.category}
                onChange={(e) => onChange(e)}
              >
                <option value="">Selecciona una categoria</option>
                <option value="platos">Platos</option>
                <option value="bebidas">Bebidas</option>
                <option value="ensaladas">Ensaladas</option>
              </Select>
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Imagen</FormLabel>
              {/* <Input
                type="file"
                label={image}
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              /> */}
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FiFile />} />
                <Input
                  type="file"
                  accept="image/*"
                  // name="image"
                  ref={imageRef}
                  // {...register("image")}
                  // {...register("image", {
                  //   onChange: (e) => uploadFileHandler,
                  // })}
                  onChange={uploadFileHandler}
                  style={{ display: "none" }}
                ></Input>
                <Input
                  onClick={() => imageRef.current.click()}
                  value={image}
                  isReadOnly
                />
              </InputGroup>
              <Box
                mt="1"
                py="1"
                px="2"
                textAlign="center"
                style={{ background: "#eee" }}
              >
                <Text
                  fontWeight="semibold"
                  style={{ display: (uploading || image) && "none" }}
                >
                  No hay imagen previa
                </Text>
                {!uploading ? (
                  image && (
                    <Image
                      marginX="auto"
                      borderRadius="full"
                      boxSize="50px"
                      src={`/images/${image}`}
                      alt="Imagen"
                    />
                  )
                ) : (
                  <Spinner label="cargando" speed="0.65s" size="md" />
                )}
              </Box>
            </FormControl>
          </Box>
          <Box
            mt="4"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Button as={ReachLink} to="/products" mr={3} variant="ghost">
              <Icon
                as={FiArrowLeft}
                h={[4, 6]}
                w={[4, 6]}
                alignSelf={"center"}
              />
            </Button> */}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => updateProduct(match.params.id, formData, history)}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Container>
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
