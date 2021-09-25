import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  IconButton,
  Button,
  Collapse,
  Icon,
  Link,
  useBreakpointValue,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

export default function HeaderHome(props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      backgroundColor={"yellow.300"}
      border="1px solid gray.600"
      boxShadow="sm"
      py="6"
      px="6"
    >
      <Flex
        justifyContent="center"
        color={useColorModeValue("gray.600", "white")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            as={ReachLink}
            to={"/"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontSize="2xl"
            fontWeight="semibold"
            color={useColorModeValue("gray.800", "white")}
          >
            Rinconcito Ayacuchano
          </Text>

          {/* <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex> */}
        </Flex>
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={5} fontSize="lg">
            {/* <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        > */}
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              display={{ base: "none", md: "inline-flex" }}
            >
              Contact Us:
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={500}
                color={"black"}
                variant="link"
                href={"tel: 51" + props.telephone || "99999"}
              >
                +51 {props.telephone || "99999"}
              </Button>
            </Text>
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
              fontSize={"lg"}
              to={"/menu"}
            >
              Carta
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
              fontSize={"lg"}
              display={{ base: "none", md: "inline-flex" }}
              to={"/register"}
            >
              Sign Up
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
              fontSize={"lg"}
              display={{ base: "none", md: "inline-flex" }}
              to={"/auth"}
            >
              Login
            </Button>
          </HStack>
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Menu 1",
    children: [
      {
        label: "Submenu 1",
        subLabel: "lorem ipsum",
        href: "#",
      },
      {
        label: "Submenu 2",
        subLabel: "lorem ipsum",
        href: "#",
      },
    ],
  },
  {
    label: "Menu 2",
    href: "#",
  },
  {
    label: "Menu 3",
    href: "#",
  },
];
