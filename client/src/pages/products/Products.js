import React, { useEffect, useState, useRef } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "./../../actions/product";
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
  Box,
  Image,
  Icon,
  HStack,
  Wrap,
  WrapItem,
  Avatar,
  LinkOverlay,
  LinkBox,
  Code,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  IconButton,
  Portal,
  MenuItem,
  forwardRef,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Spinner,
} from "@chakra-ui/react";
import {
  FiCheck,
  FiEdit,
  FiFile,
  FiMoreVertical,
  FiPlus,
  FiTrash2,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import {
  // ActionsButton,
  // ConfirmMenuItem,
  DataList,
  DataListCell,
  DataListHeader,
  DataListFooter,
  DataListRow,
  // DateAgo,
  // useToastError,
  // useToastSuccess,
  // PaginationButtonFirstPage,
  // Pagination,
  // PaginationButtonLastPage,
  // PaginationButtonNextPage,
  // PaginationButtonPrevPage,
  // PaginationInfo,
} from "./../../components/datalist/DataList";
import { Loader } from "./../../components/loader/Loader";

import { useDarkMode } from "./../../hooks/useDarkMode";

import { DateFormat } from "./../../utils/Date";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const ActionsButton = forwardRef(({ label, ...rest }, ref) => {
  return (
    <IconButton
      ref={ref}
      d="inline-flex"
      borderRadius="full"
      variant="ghost"
      color="inherit"
      colorScheme="gray"
      bg="transparent"
      opacity="0.5"
      _hover={{ opacity: 1, bg: "rgba(0, 0, 0, 0.05)" }}
      _focus={{ opacity: 1, boxShadow: "outline" }}
      _active={{ bg: "rgba(0, 0, 0, 0.1)" }}
      icon={<FiMoreVertical />}
      aria-label=""
      {...rest}
    />
  );
});

const ProductScreen = ({
  addProduct,
  getProducts,
  deleteProduct,
  product: { products, loading },
}) => {
  const imageRef = useRef(null);
  const { colorModeValue } = useDarkMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "El nombre debe ser de almenos 5 caracteres")
      .required("Ingresa el nombre"),
    description: Yup.string().required("Ingresa la descripcion"),
    price: Yup.number()
      .required("Ingresa el precio")
      .positive("El precio debe ser mayor a 0")
      .truncate(),
    image: Yup.string().required("Agrega una imagen"),
    category: Yup.string().required("Ingresa la categoria"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitProduct = (values) => {
    console.log("Data:", values);
    return new Promise((resolve) => {
      setTimeout(() => {
        addProduct({
          name: values.name.trim(),
          description: values.description,
          category: values.category,
          price: values.price,
          image: values.image,
        });
        reset();
        setImage("");
        onClose();
        resolve();
      }, 1000);
    });
  };

  const uploadFileHandler = async (e) => {
    console.log("Imagen:", e.currentTarget.files[0]);
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

        setValue("image", data, { shouldValidate: true, shouldDirty: true });
        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error(error.response);
        setUploading(false);
      }
    }
  };

  const onCloseModal = () => {
    reset();
    setImage("");
    onClose();
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Container maxWidth="container.xl" paddingY="10">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="6"
      >
        <Text
          my={2}
          fontSize="2xl"
          // textAlign="center"
          fontWeight="bold"
          lineHeight="short"
        >
          Productos
        </Text>
        {/* <Button  leftIcon={<FiPlus />} colorScheme="blue" variant="solid">
          Create Product
        </Button> */}
        <Button onClick={onOpen} fontSize={["md", "lg"]} colorScheme="blue">
          <Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />
          <Box as="span" ml="2" display={{ base: "none", sm: "flex" }}>
            Agregar Producto
          </Box>
        </Button>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <DataList>
              <DataListHeader isVisible={{ base: false, md: true }}>
                <DataListCell colName="image" colWidth={[["5rem", "8rem"]]}>
                  Imagen
                </DataListCell>
                <DataListCell
                  colName="id"
                  isVisible={{ base: false, lg: true }}
                >
                  ID
                </DataListCell>
                <DataListCell
                  colName="name"
                  colWidth="2"
                  // isVisible={{ base: false, md: true }}
                >
                  Nombre
                </DataListCell>
                <DataListCell
                  colName="price"
                  isVisible={{ base: false, lg: true }}
                >
                  Precio
                </DataListCell>
                <DataListCell
                  colName="category"
                  isVisible={{ base: false, lg: true }}
                >
                  Categoria
                </DataListCell>
                <DataListCell
                  colName="created"
                  isVisible={{ base: false, md: true }}
                >
                  Fecha C.
                </DataListCell>
                <DataListCell
                  colName="status"
                  colWidth={{ base: "2rem", md: "0.5" }}
                  align="center"
                >
                  <Box as="span" d={{ base: "none", md: "block" }}>
                    Estado
                  </Box>
                </DataListCell>
                <DataListCell
                  colName="actions"
                  colWidth="4rem"
                  align="flex-end"
                />
              </DataListHeader>
              {products?.map((product) => (
                <DataListRow as={LinkBox} key={product._id}>
                  <DataListCell colName="image">
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://via.placeholder.com/100"
                      // src={`/images/${product.image}`}
                      alt={product.name}
                    />
                  </DataListCell>
                  <DataListCell colName="id">
                    <Text isTruncated maxW="full" fontSize="xs">
                      {product._id}
                    </Text>
                    <Wrap>
                      {/* {product.authorities?.map((authority) => (
                    <WrapItem key={authority}>
                      <Badge size="sm">{authority}</Badge>
                    </WrapItem>
                  ))} */}
                    </Wrap>
                  </DataListCell>
                  <DataListCell colName="name">
                    <HStack maxW="100%">
                      {/* <Avatar size="sm" name={product.name} mx="1" /> */}
                      <Box minW="0">
                        <Text isTruncated maxW="full" fontWeight="bold">
                          {/* <LinkOverlay as={ReachLink} to={`${url}/${product.login}`}> */}
                          {product.name}
                          {/* </LinkOverlay> */}
                        </Text>
                        <Text
                          isTruncated
                          maxW="full"
                          fontSize="sm"
                          color={colorModeValue("gray.600", "gray.300")}
                        >
                          {product.description}
                        </Text>
                      </Box>
                    </HStack>
                  </DataListCell>
                  <DataListCell colName="price" fontSize="md">
                    <Text isTruncated maxW="full">
                      S/ {product.price.toFixed(2)}
                    </Text>
                    {/* <Wrap>
                  {product.authorities?.map((authority) => (
                    <WrapItem key={authority}>
                      <Badge size="sm">{authority}</Badge>
                    </WrapItem>
                  ))}
                </Wrap> */}
                  </DataListCell>
                  <DataListCell
                    colName="category"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    <Text isTruncated maxW="full">
                      {product.category}
                    </Text>
                  </DataListCell>
                  <DataListCell
                    colName="created"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    {/* <Text isTruncated maxW="full" >
                      <DateFormat date={product.date} />
                    </Text> */}
                    {!!product.date && (
                      <Text
                        isTruncated
                        maxW="full"
                        // color={colorModeValue("gray.600", "gray.300")}
                        pointerEvents="auto"
                      >
                        {<DateFormat position="relative" date={product.date} />}
                      </Text>
                    )}
                  </DataListCell>
                  <DataListCell colName="status">
                    {product.status === 1 ? (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="sm"
                        size="md"
                        colorScheme="green"
                      >
                        <Box as="span" d={{ base: "none", md: "block" }}>
                          Activo
                        </Box>
                        <Icon
                          as={FiCheck}
                          aria-label="Activo"
                          d={{ base: "inline-flex", md: "none" }}
                        />
                        {/* <Icon
                      icon={FiCheck}
                      aria-label="Activo"
                      d={{ base: "inline-flex", md: "none" }}
                    /> */}
                      </Badge>
                    ) : (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="sm"
                        size="md"
                        colorScheme="red"
                      >
                        <Box as="span" d={{ base: "none", md: "block" }}>
                          Desactivado
                        </Box>
                        <Icon
                          icon={FiX}
                          aria-label="Desactivado"
                          d={{ base: "inline-flex", md: "none" }}
                        />
                      </Badge>
                    )}
                    {/* <productStatus isActivated={product.status} /> */}
                  </DataListCell>
                  <DataListCell colName="actions">
                    <Menu isLazy placement="left-start">
                      <MenuButton
                        as={ActionsButton}
                        // isLoading={isActionsLoading || isRemovalLoading}
                      ></MenuButton>
                      <Portal>
                        <MenuList>
                          <MenuItem
                            as={ReachLink}
                            to={`/products/edit/${product._id.toString()}`}
                            icon={<FiEdit />}
                            // icon={
                            //   <Icon icon={FiEdit} fontSize="lg" color="gray.400" />
                            // }
                          >
                            Editar
                          </MenuItem>

                          <MenuItem
                            onClick={(e) => deleteProduct(product._id)}
                            icon={<FiXCircle />}
                            // icon={
                            //   <Icon
                            //     icon={FiXCircle}
                            //     fontSize="lg"
                            //     color="gray.400"
                            //   />
                            // }
                          >
                            Eliminar
                          </MenuItem>

                          {/* <MenuDivider /> */}
                          {/* <ConfirmMenuItem
                        icon={
                          <Icon
                            icon={FiTrash2}
                            fontSize="lg"
                            color="gray.400"
                          />
                        }
                        onClick={(e) => deleteProduct(product._id)}
                      >
                        Eliminar
                      </ConfirmMenuItem> */}
                        </MenuList>
                      </Portal>
                    </Menu>
                    {/* <Button
                  as={ReachLink}
                  to={`/products/edit/${product._id.toString()}`}
                >
                  <Icon as={FiEdit} h={4} w={4} alignSelf={"center"} />
                </Button>
                <Button ml="2" onClick={(e) => deleteProduct(product._id)}>
                  <Icon as={FiTrash2} h={4} w={4} alignSelf={"center"} />
                </Button> */}
                  </DataListCell>
                </DataListRow>
              ))}
              <DataListFooter>
                {/* <Pagination
              isLoadingPage={isLoadingPage}
              setPage={setPage}
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination> */}
              </DataListFooter>
            </DataList>
          </Box>

          <Modal onClose={onCloseModal} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="xl" fontWeight="bold" lineHeight="short">
                Agregar Producto
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(submitProduct)}>
                <ModalBody>
                  <FormControl mt={1} isInvalid={errors.name}>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      // name="name"
                      // value={name}
                      type="text"
                      autoComplete="off"
                      {...register("name")}
                    />
                    {errors.name && errors.name.message ? (
                      <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.description}>
                    <FormLabel>Descripcion</FormLabel>
                    <Input
                      // name="description"
                      // value={description}
                      type="text"
                      autoComplete="off"
                      {...register("description")}
                    />
                    {errors.description && errors.description.message ? (
                      <FormErrorMessage>
                        {errors.description.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.price}>
                    <FormLabel>Precio</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="S/" />
                      <Input
                        type="number"
                        step="any"
                        // name="price"
                        // value={price}
                        autoComplete="off"
                        {...register("price")}
                      />
                    </InputGroup>
                    {errors.price && errors.price.message ? (
                      <FormErrorMessage>
                        {errors.price.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.category}>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      as="select"
                      // name="category"
                      // value={category}
                      {...register("category")}
                    >
                      <option value="">Selecciona una categoria</option>
                      <option value="platos">Platos</option>
                      <option value="bebidas">Bebidas</option>
                      <option value="ensaladas">Ensaladas</option>
                    </Select>
                    {errors.category && errors.category.message ? (
                      <FormErrorMessage>
                        {errors.category.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.image}>
                    <FormLabel>Imagen</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiFile />}
                      />
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
                    {errors.image && errors.image.message ? (
                      <FormErrorMessage>
                        {errors.image.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onCloseModal} mr={3}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    {/* onClick={submitProduct} */}
                    Agregar
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
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
