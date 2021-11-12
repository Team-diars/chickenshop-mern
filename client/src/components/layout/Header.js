import React, { useEffect } from "react";
import { Link as ReachLink, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout, loadUser } from "../../actions/auth";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Text,
  Stack,
  Link,
  useColorMode,
  Avatar,
  Spinner,
  MenuGroup,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import {
  FiLogOut,
  FiUser,
  FiUsers,
  FiPackage,
  FiDatabase,
  FiRadio,
  FiShoppingBag,
  FiPlusCircle,
  FiFileText,
} from "react-icons/fi";

const MainMenuItem = ({ to, ...rest }) => {
  // const { rtlValue } = useRtl();
  // const { navOnClose } = useLayoutContext();

  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);
  return (
    <Box
      as={ReachLink}
      to={to}
      bg="yellow.200"
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontWeight="bold"
      borderRadius="md"
      px="4"
      py="2"
      rounded={"lg"}
      fontSize="lg"
      _active={{ bg: "gray.300" }}
      _hover={{
        bg: "yellow.400",
        _after: {
          opacity: 1,
          w: "2rem",
        },
      }}
      _focus={{
        outline: "none",
        bg: "yellow.400",
        _after: {
          opacity: 1,
          w: "2rem",
        },
      }}
      _after={{
        opacity: isActive ? 1 : 0,
        content: '""',
        position: "absolute",
        insetStart: { base: 8, md: "50%" },
        bottom: "0.2em",
        transform: "translateX(-50%)",
        transition: "0.2s",
        w: isActive ? "2rem" : 0,
        h: "2px",
        borderRadius: "full",
        bg: "currentColor",
      }}
      // onClick={navOnClose}
      {...rest}
    />
  );
};

const AccountMenu = (props) => {
  // const { account, isLoading } = useAccount();
  const history = useHistory();
  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar
          size="sm"
          name={props.user?.name}
          src={props.user?.avatar}
        ></Avatar>
        {/* <Avatar size="sm" icon={<></>} name={!isLoading && `${props.user?.name}`}>
          {isLoading && <Spinner size="xs" />}
        </Avatar> */}
      </MenuButton>
      <MenuList color={"gray.800"} maxW="12rem" overflow="hidden">
        <MenuGroup
          title={`${props.user?.name} ${props.user?.lastname}`}
          isTruncated
        >
          <MenuItem as={ReachLink} to="/profile" icon={<FiUser />}>
            Perfil
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem icon={<FiLogOut />} onClick={props.onLogout}>
          Salir
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = ({
  to,
  logout,
  loadUser,
  auth: { user, isAuthenticated, loading },
  ...rest
}) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);
  const AdminNavbar = (
    <>
      <Menu placement="bottom-end" {...rest}>
        <MenuButton
          bg="yellow.200"
          justifyContent="flex-start"
          position="relative"
          opacity={isActive ? 1 : 0.8}
          fontWeight="bold"
          borderRadius="md"
          px="4"
          py="2"
          rounded={"lg"}
          fontSize="lg"
          _active={{ bg: "gray.300" }}
          _hover={{
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _focus={{
            outline: "none",
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _after={{
            opacity: isActive ? 1 : 0,
            content: '""',
            position: "absolute",
            insetStart: { base: 8, md: "50%" },
            bottom: "0.2em",
            transform: "translateX(-50%)",
            transition: "0.2s",
            w: isActive ? "2rem" : 0,
            h: "2px",
            borderRadius: "full",
            bg: "currentColor",
          }}
        >
          Pedidos
        </MenuButton>
        <MenuList color={"gray.800"} maxW="12rem" overflow="hidden">
          <MenuGroup title={""} isTruncated>
            <MenuItem as={ReachLink} to="/liveorders" icon={<FiRadio />}>
              Pedidos Online
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem as={ReachLink} to="/orders" icon={<FiShoppingBag />}>
            Pedidos
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu placement="bottom-end" {...rest}>
        <MenuButton
          bg="yellow.200"
          justifyContent="flex-start"
          position="relative"
          opacity={isActive ? 1 : 0.8}
          fontWeight="bold"
          borderRadius="md"
          px="4"
          py="2"
          rounded={"lg"}
          fontSize="lg"
          _active={{ bg: "gray.300" }}
          _hover={{
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _focus={{
            outline: "none",
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _after={{
            opacity: isActive ? 1 : 0,
            content: '""',
            position: "absolute",
            insetStart: { base: 8, md: "50%" },
            bottom: "0.2em",
            transform: "translateX(-50%)",
            transition: "0.2s",
            w: isActive ? "2rem" : 0,
            h: "2px",
            borderRadius: "full",
            bg: "currentColor",
          }}
        >
          Ventas
        </MenuButton>
        <MenuList color={"gray.800"} maxW="12rem" overflow="hidden">
          <MenuGroup title={""} isTruncated>
            <MenuItem as={ReachLink} to="/orders" icon={<FiPlusCircle />}>
              Registrar Pedido
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem as={ReachLink} to="/sales" icon={<FiFileText />}>
            Generar Venta
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu placement="bottom-end" {...rest}>
        <MenuButton
          bg="yellow.200"
          justifyContent="flex-start"
          position="relative"
          opacity={isActive ? 1 : 0.8}
          fontWeight="bold"
          borderRadius="md"
          px="4"
          py="2"
          rounded={"lg"}
          fontSize="lg"
          _active={{ bg: "gray.300" }}
          _hover={{
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _focus={{
            outline: "none",
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _after={{
            opacity: isActive ? 1 : 0,
            content: '""',
            position: "absolute",
            insetStart: { base: 8, md: "50%" },
            bottom: "0.2em",
            transform: "translateX(-50%)",
            transition: "0.2s",
            w: isActive ? "2rem" : 0,
            h: "2px",
            borderRadius: "full",
            bg: "currentColor",
          }}
        >
          Configuraciones
        </MenuButton>
        <MenuList color={"gray.800"} maxW="12rem" overflow="hidden">
          <MenuGroup title={""} isTruncated>
            <MenuItem as={ReachLink} to="/users" icon={<FiUser />}>
              Usuarios
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title={""} isTruncated>
            <MenuItem as={ReachLink} to="/employees" icon={<FiUser />}>
              Empleados
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title={""} isTruncated>
            <MenuItem as={ReachLink} to="/products" icon={<FiPackage />}>
              Productos
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <MainMenuItem to="/settings">Ajustes</MainMenuItem>
      <AccountMenu user={user} onLogout={() => logout()} />
    </>
  );
  const CashierNavbar = (
    <>
      <MainMenuItem to="/profile">Perfil</MainMenuItem>
      <MainMenuItem to="/liveorders">Pedidos Online</MainMenuItem>
      <MainMenuItem to="/orders">Pedidos</MainMenuItem>
      <Menu placement="bottom-end" {...rest}>
        <MenuButton
          bg="yellow.200"
          justifyContent="flex-start"
          position="relative"
          opacity={isActive ? 1 : 0.8}
          fontWeight="bold"
          borderRadius="md"
          px="4"
          py="2"
          rounded={"lg"}
          fontSize="lg"
          _active={{ bg: "gray.300" }}
          _hover={{
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _focus={{
            outline: "none",
            bg: "yellow.400",
            _after: {
              opacity: 1,
              w: "2rem",
            },
          }}
          _after={{
            opacity: isActive ? 1 : 0,
            content: '""',
            position: "absolute",
            insetStart: { base: 8, md: "50%" },
            bottom: "0.2em",
            transform: "translateX(-50%)",
            transition: "0.2s",
            w: isActive ? "2rem" : 0,
            h: "2px",
            borderRadius: "full",
            bg: "currentColor",
          }}
        >
          Ventas
        </MenuButton>
        <MenuList color={"gray.800"} maxW="12rem" overflow="hidden">
          <MenuGroup title={""} isTruncated>
            <MenuItem
              as={ReachLink}
              to="/orders"
              icon={<Icon icon={FiUser} fontSize="lg" color="gray.400" />}
            >
              Registrar Pedido
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            as={ReachLink}
            to="/sales"
            icon={<Icon icon={FiLogOut} fontSize="lg" color="gray.400" />}
          >
            Generar Venta
          </MenuItem>
        </MenuList>
      </Menu>
      <AccountMenu user={user} />
    </>
  );
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Box
      backgroundColor={"yellow.300"}
      border="1px solid gray.600"
      boxShadow="sm"
      py="6"
      px="6"
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            as={ReachLink}
            to={"/"}
            textAlign={"center"}
            fontFamily={"heading"}
            fontSize="2xl"
          >
            Rinconcito Ayacuchano
          </Text>
        </Flex>
        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          <HStack spacing={9} alignItems={"center"}>
            <HStack as={"nav"} spacing={6} fontSize="lg">
              <Stack direction="row" spacing="3" {...rest}>
                {/* <Text
                  textAlign={useBreakpointValue({ base: "center", md: "left" })}
                  fontFamily={"heading"}
                  color={useColorModeValue("gray.800", "white")}
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                  marginRight="3"
                >
                  Llamanos:
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={"black"}
                    variant="link"
                    href={"tel: 5199999"}
                  >
                    +51 {"99999222"}
                  </Button>
                </Text> */}
                <MainMenuItem to="/menu">Menu</MainMenuItem>
                {!loading && isAuthenticated ? (
                  user && user.role === "admin" ? (
                    AdminNavbar
                  ) : (
                    CashierNavbar
                  )
                ) : (
                  <MainMenuItem to="/auth">Ingresar</MainMenuItem>
                )}
              </Stack>
            </HStack>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loadUser,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
