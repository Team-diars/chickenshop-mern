import React, { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout, loadUser } from "../../actions/auth";
import HeaderHome from "./../home/HeaderHome";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
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
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",controlId
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={children.url}
//   >
//     {children.name}
//   </Link>
// );

const Header = ({
  loadUser,
  auth: { user, isAuthenticated, loading },
  logout,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleOpen = () => setIsOpen(!isOpen);
  const { isOpenA, onOpen, onClose } = useDisclosure();
  const GuestNavbar = (
    <header className="header-website">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="full">
              <a className="logo" href="/">
                <img src="/images-website/logo.png" alt="#" />
              </a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="full">
              <div className="right_header_info">
                <ul>
                  <li className="dinone">
                    Contact Us :{" "}
                    <img
                      style={{ marginRight: "15px", marginLeft: "15px" }}
                      src="/images-website/phone_icon.png"
                      alt="#"
                    />
                    <a href="#">987-654-3210</a>
                  </li>
                  <li className="dinone">
                    <img
                      style={{ marginRight: "15px" }}
                      src="/images-website/mail_icon.png"
                      alt="#"
                    />
                    <a href="#">demo@gmail.com</a>
                  </li>
                  <li className="dinone">
                    <img
                      style={{
                        marginRight: "15px",
                        height: "21px",
                        position: "relative",
                        top: "-2px",
                      }}
                      src="/images-website/location_icon.png"
                      alt="#"
                    />
                    <a href="#">104 New york , USA</a>
                  </li>
                  <li className="button_user">
                    <a className="button active" href="/auth">
                      Login
                    </a>
                    <a className="button" href="#">
                      Register
                    </a>
                  </li>
                  <li>
                    <img
                      style={{ marginRight: "15px" }}
                      src="/images-website/search_icon.png"
                      alt="#"
                    />
                  </li>
                  <li>
                    <button
                      type="button"
                      id="sidebarCollapse"
                      // onClick={handleOpen}
                    >
                      <img src="/images-website/menu_icon.png" alt="#" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const AdminNavbar = (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <HStack as={"nav"} spacing={5} fontSize="lg">
          {/* {Links.map((link) => (
            <Link href={link.url}>{link.name}</Link>
          ))} */}
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="profile"
            to="/profile"
          >
            Profile
          </Button>
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="menu"
            to="/menu"
          >
            Menu
          </Button>
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="liveorders"
            to="/liveorders"
          >
            LiveOrders
          </Button>
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="kitchen"
            to="/kitchen"
          >
            Kitchen
          </Button>
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="orders"
            to="/orders"
          >
            Orders
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              px={2}
              py={1}
              rounded={"lg"}
              cursor={"pointer"}
              color="black"
              bg="blackAlpha.100"
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.100", "gray.500"),
              }}
              fontWeight="semibold"
              fontSize="lg"
            >
              Sale
            </MenuButton>
            <MenuList>
              <MenuItem as={ReachLink} key="orders" to="/orders">
                Register Order
              </MenuItem>
              <MenuItem as={ReachLink} key="sales" to="/sales">
                Generate Sale
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              px={2}
              py={1}
              rounded={"lg"}
              cursor={"pointer"}
              color="black"
              bg="blackAlpha.100"
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.100", "gray.500"),
              }}
              fontWeight="semibold"
              fontSize="lg"
            >
              Maintenance
            </MenuButton>
            <MenuList>
              <MenuItem as={ReachLink} key="users" to="/users">
                Users
              </MenuItem>
              <MenuItem as={ReachLink} key="employees" to="/employees">
                Employees
              </MenuItem>
              <MenuItem as={ReachLink} key="products" to="/products">
                Products
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            as={ReachLink}
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.200"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="settings"
            to="/settings"
          >
            Settings
          </Button>
          <Button
            px={2}
            py={1}
            rounded={"lg"}
            bg="blackAlpha.100"
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.500"),
            }}
            fontWeight="semibold"
            fontSize="lg"
            key="logout"
            to="/auth"
            onClick={logout}
          >
            Logout
          </Button>
        </HStack>
      </HStack>
    </>
  );
  const CashierNavbar = (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <HStack as={"nav"} spacing={4}>
          {/* {Links.map((link) => (
            <Link href={link.url}>{link.name}</Link>
          ))} */}
          <Link key="profile" to="/profile">
            Profile
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"sm"}
              variant={"link"}
              cursor={"pointer"}
            >
              Sale
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link key="orders" to="/orders">
                  Register Order
                </Link>
              </MenuItem>
              <MenuItem>
                <Link key="sales" to="/sales">
                  Generate Sale
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
          <Link key="logout" onClick={logout} to="/auth">
            Logout
          </Link>
        </HStack>
      </HStack>
    </>
  );
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return !loading && !isAuthenticated ? (
    <HeaderHome />
  ) : (
    <Box
      backgroundColor={"yellow.300"}
      border="1px solid gray.600"
      boxShadow="sm"
      py="6"
      px="6"
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          color="white"
          icon={isOpenA ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpenA ? onClose : onOpen}
        />
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
          {/* <Text fontSize="xl">Harike</Text> */}
        </Flex>
        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          {!loading && isAuthenticated && user && user.role === "admin"
            ? AdminNavbar
            : CashierNavbar}
        </Flex>
      </Flex>
      {isOpenA ? (
        // <Box pb={4} display={{ md: 'none' }}>
        //   <Stack as={'nav'} spacing={4}>
        //     {Links.map((link) => (
        //       <NavLink key={link}>{link}</NavLink>
        //     ))}
        //   </Stack>
        // </Box>

        <Box display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {!loading && isAuthenticated && user && user.role === "admin"
              ? AdminNavbar
              : CashierNavbar}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser })(Header);
