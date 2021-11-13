import React, { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import PropTypes from "prop-types";
import { getTickets, deleteTicket } from "../../actions/ticket";
import { connect } from "react-redux";
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

const MainTable = ({
  getTickets,
  deleteTicket,
  ticket: { tickets, loading },
}) => {
  const { colorModeValue } = useDarkMode();

  useEffect(() => {
    getTickets();
  }, [getTickets]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <DataList>
            <DataListHeader isVisible={{ base: false, md: true }}>
              <DataListCell
                colName="id"
                colWidth={[["5rem", "8rem"]]}
                isVisible={{ base: false, lg: true }}
              >
                ID
              </DataListCell>
              <DataListCell
                colName="cashier"
                colWidth={[["6rem", "12rem"]]}
                isVisible={{ base: false, lg: true }}
              >
                Cajero
              </DataListCell>
              <DataListCell
                colName="table"
                // isVisible={{ base: false, md: true }}
              >
                Mesa
              </DataListCell>
              <DataListCell
                colName="subtotal"
                isVisible={{ base: false, lg: true }}
              >
                Subtotal
              </DataListCell>
              <DataListCell
                colName="total"
                // isVisible={{ base: false, lg: true }}
              >
                Total
              </DataListCell>
              <DataListCell
                colName="haspaid"
                isVisible={{ base: false, lg: true }}
              >
                Pagado
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
            {tickets?.length > 0 ? (
              tickets?.map(
                (ticket, idx) =>
                  !ticket.hasPaid && (
                    <DataListRow as={LinkBox} key={ticket._id}>
                      <DataListCell colName="id">
                        <Text isTruncated maxW="full" fontSize="xs">
                          {ticket._id}
                        </Text>
                      </DataListCell>
                      <DataListCell colName="cashier">
                        <HStack maxW="100%">
                          <Box minW="0">
                            <Text isTruncated maxW="full">
                              {ticket.cashier}
                            </Text>
                            <Text
                              isTruncated
                              maxW="full"
                              fontSize="sm"
                              color={colorModeValue("gray.600", "gray.300")}
                            >
                              {ticket.description}
                            </Text>
                          </Box>
                        </HStack>
                      </DataListCell>
                      <DataListCell colName="table" fontSize="md">
                        <Text isTruncated maxW="full" fontWeight="bold">
                          #{ticket.num_table}
                        </Text>
                      </DataListCell>
                      <DataListCell colName="subtotal" fontSize="md">
                        <Text isTruncated maxW="full">
                          S/ {ticket.subtotal.toFixed(2)}
                        </Text>
                      </DataListCell>
                      <DataListCell colName="total" fontSize="md">
                        <Text isTruncated maxW="full">
                          S/ {ticket.total.toFixed(2)}
                        </Text>
                      </DataListCell>
                      <DataListCell
                        colName="category"
                        fontSize="md"
                        position="relative"
                        pointerEvents="none"
                      >
                        <Text isTruncated maxW="full">
                          {ticket.hasPaid ? "Si" : "No"}
                        </Text>
                      </DataListCell>
                      <DataListCell
                        colName="created"
                        fontSize="md"
                        position="relative"
                        pointerEvents="none"
                      >
                        {/* <Text isTruncated maxW="full" >
                      <DateFormat date={ticket.date} />
                    </Text> */}
                        {!!ticket.date && (
                          <Text
                            isTruncated
                            maxW="full"
                            // color={colorModeValue("gray.600", "gray.300")}
                            pointerEvents="auto"
                          >
                            {
                              <DateFormat
                                position="relative"
                                date={ticket.date}
                              />
                            }
                          </Text>
                        )}
                      </DataListCell>
                      <DataListCell colName="status">
                        {ticket.status === 1 ? (
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
                        {/* <productStatus isActivated={ticket.status} /> */}
                      </DataListCell>
                      <DataListCell colName="actions">
                        <Menu isLazy placement="left-start">
                          <MenuButton
                            as={ActionsButton}
                            // isLoading={isActionsLoading || isRemovalLoading}
                          ></MenuButton>
                          <Portal>
                            <MenuList>
                              {/* <MenuItem
                              as={ReachLink}
                              to={`/orders/edit/${ticket._id.toString()}`}
                              icon={<FiEdit />}
                            >
                              Editar
                            </MenuItem> */}
                              <MenuItem
                                onClick={(e) => deleteTicket(ticket._id)}
                                icon={<FiXCircle />}
                              >
                                Eliminar
                              </MenuItem>
                            </MenuList>
                          </Portal>
                        </Menu>
                      </DataListCell>
                    </DataListRow>
                  )
              )
            ) : (
              <DataListRow>
                <DataListCell>
                  <Text isTruncated w="full" textAlign="center" fontSize="md">
                    No existen datos
                  </Text>
                </DataListCell>
              </DataListRow>
            )}
          </DataList>
        </Box>
      )}
    </>
  );
};

MainTable.propTypes = {
  getTickets: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getTickets, deleteTicket })(
  MainTable
);
