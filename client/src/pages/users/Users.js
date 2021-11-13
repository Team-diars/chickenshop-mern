import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, addUser, deleteUser } from "./../../actions/user";
import { getEmployees } from "./../../actions/employee";
import PropTypes from "prop-types";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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

const UserScreen = ({
  getUsers,
  addUser,
  deleteUser,
  getEmployees,
  employee: { employees, loading: loading_emp },
  user: { users, loading },
}) => {
  const { colorModeValue } = useDarkMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    employee: "",
  });
  const { employee, password } = formData;
  // const handleOpen = () => setIsOpen(!isOpen);

  const submitUser = () => {
    addUser({ employee, password });
    setFormData({ employee: "", password: "" });
    // setIsOpen(!isOpen);
    onClose();
  };
  const onCloseModal = () => {
    // reset();
    onClose();
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

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
          Usuarios
        </Text>
        <Button onClick={onOpen} fontSize={["md", "lg"]} colorScheme="blue">
          <Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />
          <Box as="span" ml="2" display={{ base: "none", sm: "flex" }}>
            Agregar Usuario
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
              {users?.map((user) => (
                <DataListRow as={LinkBox} key={user._id}>
                  <DataListCell colName="id">
                    <Text isTruncated maxW="full" fontSize="xs">
                      {user._id}
                    </Text>
                    <Wrap>
                      {/* {user.authorities?.map((authority) => (
                    <WrapItem key={authority}>
                      <Badge size="sm">{authority}</Badge>
                    </WrapItem>
                  ))} */}
                    </Wrap>
                  </DataListCell>
                  <DataListCell colName="name">
                    <HStack maxW="100%">
                      {/* <Avatar size="sm" name={user.name} mx="1" /> */}
                      <Box minW="0">
                        <Text isTruncated maxW="full" fontWeight="bold">
                          {/* <LinkOverlay as={ReachLink} to={`${url}/${user.login}`}> */}
                          {user.name}
                          {/* </LinkOverlay> */}
                        </Text>
                        <Text
                          isTruncated
                          maxW="full"
                          fontSize="sm"
                          color={colorModeValue("gray.600", "gray.300")}
                        >
                          {user.lastname}
                        </Text>
                      </Box>
                    </HStack>
                  </DataListCell>

                  <DataListCell
                    colName="email"
                    fontSize="md"
                    position="relative"
                    pointerEvents="none"
                  >
                    <Text isTruncated maxW="full">
                      {user.email}
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
                    {!!user.date && (
                      <Text
                        isTruncated
                        maxW="full"
                        // color={colorModeValue("gray.600", "gray.300")}
                        pointerEvents="auto"
                      >
                        {<DateFormat position="relative" date={user.date} />}
                      </Text>
                    )}
                  </DataListCell>
                  <DataListCell colName="status">
                    {user.status === 1 ? (
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
                            to={`/users/edit/${user.coduser.toString()}`}
                            icon={<FiEdit />}
                            // icon={
                            //   <Icon icon={FiEdit} fontSize="lg" color="gray.400" />
                            // }
                          >
                            Editar
                          </MenuItem>

                          <MenuItem
                            onClick={(e) => deleteUser(user.coduser)}
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
                Agregar Usuario
              </ModalHeader>
              <ModalBody>
                <FormControl mt={1}>
                  <FormLabel>Empleado</FormLabel>
                  <Select
                    name="employee"
                    type="select"
                    onChange={(e) => onChange(e)}
                    value={employee}
                  >
                    <option value="">Selecciona un empleado</option>
                    {employees.map(
                      (emp) =>
                        emp.coduser === null && (
                          <option key={emp._id} value={emp._id}>
                            {emp.lastname} {emp.name} | {emp.dni}
                          </option>
                        )
                    )}
                  </Select>
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Contrasena</FormLabel>
                  <Input
                    name="password"
                    value={password}
                    type="password"
                    onChange={(e) => onChange(e)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onCloseModal} mr={3}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" type="submit" onClick={submitUser}>
                  Agregar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  employee: state.employee,
});

UserScreen.propTypes = {
  addUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  getUsers,
  addUser,
  deleteUser,
  getEmployees,
})(UserScreen);
