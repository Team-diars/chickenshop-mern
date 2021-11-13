import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEmployees,
  deleteEmployee,
  addEmployee,
} from "./../../actions/employee";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  useDisclosure,
  Button,
  Table,
  Box,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormLabel,
  Input,
  Select,
  ModalCloseButton,
  FormControl,
  Icon,
  HStack,
  Wrap,
  LinkBox,
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

const EmployeeScreen = ({
  getEmployees,
  addEmployee,
  deleteEmployee,
  employee: { employees, loading },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorModeValue } = useDarkMode();

  // const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   lastname: "",
  //   dni: "",
  //   address: "",
  //   email: "",
  //   role: "",
  // });
  // const { name, lastname, dni, address, email, role } = formData;
  // const handleOpen = () => setIsOpen(!isOpen);

  const employeeSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "El nombre debe ser de almenos 5 caracteres")
      .required("Ingresa el nombre"),
    lastname: Yup.string().required("Ingresa los apellidos"),
    dni: Yup.string().required("Ingresa el dni"),
    role: Yup.string().required("Selecciona el rol"),
    address: Yup.string().required("Ingresa la direccion"),
    email: Yup.string()
      .email("Ingresa un email valido")
      .required("Ingresa un email"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  // const submitEmployee = () => {
  //   addEmployee({ name, lastname, role, dni, email, address });
  //   setFormData({
  //     name: "",
  //     lastname: "",
  //     role: "",
  //     dni: "",
  //     email: "",
  //     address: "",
  //   });
  //   // setIsOpen(!isOpen);
  //   onClose();
  // };
  const submitEmployee = (values) => {
    console.log("Data:", values);
    return new Promise((resolve) => {
      setTimeout(() => {
        // addEmployee({
        //   name: values.name.trim(),
        //   lastname: values.lastname,
        //   role: values.role,
        //   dni: values.dni,
        //   email: values.email,
        //   address: values.address,
        // });
        reset();
        onClose();
        resolve();
      }, 1000);
    });
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
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
          Empleados
        </Text>
        <Button onClick={onOpen} fontSize="lg" colorScheme="blue">
          <Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />
          <Box as="span" ml="2" display={{ base: "none", sm: "flex" }}>
            Agregar Empleado
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
                <DataListCell colName="id" colWidth={[["5rem", "8rem"]]}>
                  ID
                </DataListCell>
                <DataListCell
                  colName="name"
                  // colWidth="2"
                  // isVisible={{ base: false, lg: true }}
                >
                  Nombre
                </DataListCell>
                <DataListCell
                  colName="email"
                  // colWidth="2"
                  isVisible={{ base: false, md: true }}
                >
                  Email
                </DataListCell>
                <DataListCell
                  colName="role"
                  isVisible={{ base: false, lg: true }}
                >
                  Rol
                </DataListCell>
                <DataListCell
                  colName="dni"
                  // isVisible={{ base: false, lg: true }}
                >
                  DNI
                </DataListCell>
                <DataListCell
                  colName="address"
                  isVisible={{ base: false, md: true }}
                >
                  Direccion
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
              {employees?.map((employee) => (
                <DataListRow as={LinkBox} key={employee._id}>
                  <DataListCell colName="id">
                    <Text isTruncated maxW="full" fontSize="xs">
                      {employee._id}
                    </Text>
                    <Wrap>
                      {/* {employee.authorities?.map((authority) => (
                    <WrapItem key={authority}>
                      <Badge size="sm">{authority}</Badge>
                    </WrapItem>
                  ))} */}
                    </Wrap>
                  </DataListCell>
                  <DataListCell colName="name">
                    <HStack maxW="100%">
                      {/* <Avatar size="sm" name={employee.name} mx="1" /> */}
                      <Box minW="0">
                        <Text isTruncated maxW="full" fontWeight="bold">
                          {/* <LinkOverlay as={ReachLink} to={`${url}/${employee.login}`}> */}
                          {employee.name}
                          {/* </LinkOverlay> */}
                        </Text>
                        <Text
                          isTruncated
                          maxW="full"
                          fontSize="sm"
                          color={colorModeValue("gray.600", "gray.300")}
                        >
                          {employee.lastname}
                        </Text>
                      </Box>
                    </HStack>
                  </DataListCell>
                  <DataListCell colName="email" fontSize="md">
                    <Text isTruncated maxW="full">
                      {employee.email}
                    </Text>
                  </DataListCell>
                  <DataListCell
                    colName="role"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    <Text isTruncated maxW="full">
                      {employee.role}
                    </Text>
                  </DataListCell>
                  <DataListCell
                    colName="dni"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    <Text isTruncated maxW="full">
                      {employee.dni}
                    </Text>
                  </DataListCell>
                  <DataListCell
                    colName="address"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    <Text isTruncated maxW="full">
                      {employee.address}
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
                    {!!employee.date && (
                      <Text
                        isTruncated
                        maxW="full"
                        // color={colorModeValue("gray.600", "gray.300")}
                        pointerEvents="auto"
                      >
                        {
                          <DateFormat
                            position="relative"
                            date={employee.date}
                          />
                        }
                      </Text>
                    )}
                  </DataListCell>
                  <DataListCell colName="status">
                    {employee.status === 1 ? (
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
                            to={`/employees/edit/${employee._id.toString()}`}
                            icon={<FiEdit />}
                            // icon={
                            //   <Icon icon={FiEdit} fontSize="lg" color="gray.400" />
                            // }
                          >
                            Editar
                          </MenuItem>

                          <MenuItem
                            onClick={(e) => deleteEmployee(employee._id)}
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
                Agregar Empleado
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(submitEmployee)}>
                <ModalBody>
                  <FormControl mt={1} isInvalid={errors.name}>
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      // name="name"
                      // value={name}
                      type="text"
                      // onChange={(e) => onChange(e)}
                      {...register("name")}
                    />
                    {errors.name && errors.name.message ? (
                      <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.lastname}>
                    <FormLabel>Apellidos</FormLabel>

                    <Input
                      // name="lastname"
                      type="text"
                      // value={lastname}
                      // onChange={(e) => onChange(e)}
                      {...register("lastname")}
                    />
                    {errors.lastname && errors.lastname.message ? (
                      <FormErrorMessage>
                        {errors.lastname.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.role}>
                    <FormLabel>Rol</FormLabel>

                    <Select
                      as="select"
                      // name="role"
                      // value={role}
                      // onChange={(e) => onChange(e)}
                      {...register("role")}
                    >
                      <option value="">Selecciona el rol</option>
                      <option value="admin">Admin</option>
                      <option value="cajero">Cajero</option>
                    </Select>
                    {errors.role && errors.role.message ? (
                      <FormErrorMessage>{errors.role.message}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.dni}>
                    <FormLabel>DNI</FormLabel>
                    <Input
                      // name="dni"
                      // value={dni}
                      type="text"
                      // onChange={(e) => onChange(e)}
                      {...register("dni")}
                    />
                    {errors.dni && errors.dni.message ? (
                      <FormErrorMessage>{errors.dni.message}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      // name="email"
                      // value={email}
                      type="email"
                      // onChange={(e) => onChange(e)}
                      {...register("email")}
                    />
                    {errors.email && errors.email.message ? (
                      <FormErrorMessage>
                        {errors.email.message}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl mt={3} isInvalid={errors.address}>
                    <FormLabel>Direccion</FormLabel>
                    <Input
                      // name="address"
                      // value={address}
                      type="text"
                      // onChange={(e) => onChange(e)}
                      {...register("address")}
                    />
                    {errors.address && errors.address.message ? (
                      <FormErrorMessage>
                        {errors.address.message}
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
  employee: state.employee,
});
EmployeeScreen.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  getEmployees,
  addEmployee,
  deleteEmployee,
})(EmployeeScreen);
