import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.700", "whiteAlpha.400")}
      color="white"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.600", "whiteAlpha.600"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function FooterWithSocial(props) {
  const { settings } = props;
  const year = new Date().getFullYear();
  return (
    <Box
      bg={useColorModeValue("blackAlpha.200", "blackAlpha.900")}
      color={useColorModeValue("blackAlpha.700", "blackAlpha.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text fontWeight="semibold">
          {settings?.appname} © {year}
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Facebook"}
            href={settings?.social_links.facebook}
          >
            <FaFacebook />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={settings?.social_links.instagram}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}