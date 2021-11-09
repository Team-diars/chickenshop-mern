import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../actions/product";
import { getSettings } from "../actions/settings";
import { getCategories } from "../actions/category";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  // useDisclosure,
  Container,
  createIcon,
  Heading,
  Divider,
} from "@chakra-ui/react";

import { GiChickenOven, GiFootTrip } from "react-icons/gi";

import ProductAddToCart from "./../components/products/ProductCard";
import FeatureCard from "./../components/home/FeatureCard";
import CategoryCard from "./../components/home/CategoryCard";
import FooterHome from "./../components/home/FooterHome";
import Newsletter from "./../components/home/Newsletter";

const HomeScreen = ({
  getSettings,
  getCategories,
  getProducts,
  category: { categories },
  settings: { settings: _settings, loading },
  product: { products, loading: p_loading },
}) => {
  const [formData, setFormData] = useState({
    address: "",
    telephone: "",
    email: "",
    facebook: "",
    instagram: "",
  });
  // const { isOpen, onToggle } = useDisclosure();
  // const { address, telephone, email } = formData;
  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    if (!loading && _settings) {
      setFormData({
        _id: _settings._id || "",
        address: _settings.address || "",
        telephone: _settings.telephone || "",
        email: _settings.email || "",
        facebook: _settings?.social_links?.facebook || "",
        instagram: _settings?.social_links?.instagram || "",
      });
    }
  }, [_settings, loading]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  console.log("Categories:", categories);
  return (
    <Box maxW="full">
      <Box
        bg="blackAlpha.800"
        w="full"
        // backgroundImage="url('https://media.discordapp.net/attachments/877385598627905579/890098348927881226/como-abrir-una-polleria.png')"
        backgroundImage="url(https://scontent.flim9-1.fna.fbcdn.net/v/t1.6435-9/176159586_2788581568070408_2835478741898514405_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeEhoVKhyf1grszzuVGdyqm6j9S8Jip9DBSP1LwmKn0MFEceQqFp9J9bbX7MAaxM4d0&_nc_ohc=vbgWsKC03yoAX93PuXb&_nc_oc=AQn6Bt_oxGj4g4KFT7TRcuN_tMrSlsx46oBUOJG-j-yNW8fVXK1KvVQwxf45nH8FkuMF652XD_xSj9jsn9zzopMg&tn=xBURpsnkRHQBKBCA&_nc_ht=scontent.flim9-1.fna&oh=550ddbcf5b630c82eed45931f36067c9&oe=616F81BD)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.500"
        >
          <Stack
            maxW={"full"}
            as={Box}
            textAlign={"center"}
            // spacing={{ base: 6, md: 8 }}
            py={{ base: 20, md: 32 }}
          >
            <Box d="flex" justifyContent="center">
              {/* <GiChickenOven size={"100"} color="white" /> */}
              {/* <GiFootTrip size={"100"} color="white" /> */}
            </Box>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color="white"
            >
              Rinconcito <br />
              <Text as={"span"} color={"yellow.400"}>
                Ayacuchano
              </Text>
            </Heading>
            <Text color={"gray.100"}>
              Ven y disfruta de los mejores platos!
            </Text>
            <Stack
              marginTop="2"
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button
                as={ReachLink}
                to={"/menu"}
                colorScheme={"yellow"}
                bg={"yellow.300"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "yellow.400",
                }}
              >
                Ver Carta
              </Button>
              <Box>
                <Icon
                  as={Arrow}
                  color={useColorModeValue("gray.100", "gray.300")}
                  w={71}
                  position={"absolute"}
                  right={-61}
                  top={"40px"}
                />
                <Text
                  fontSize={["sm", "lg"]}
                  fontFamily={"Caveat"}
                  position={"absolute"}
                  right={["-110px", "-155px"]}
                  bottom={"15px"}
                  transform={"rotate(10deg)"}
                  color="white"
                >
                  Haz tu pedido ya!
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </Box>
      <Container maxWidth="container.xl">
        <Text mt="8" fontSize="3xl" fontWeight="bold" color={"black"}>
          Categorias
        </Text>
        <Flex w="full" alignItems="center" flexWrap="wrap" my="10">
          {categories.map((item) => (
            <CategoryCard key={item._id} product={item} />
          ))}
        </Flex>
      </Container>
      <Container maxWidth="container.xl">
        <Stack direction="row" py={6} px={8}>
          <Divider />
        </Stack>
      </Container>
      <Container maxWidth="container.xl">
        <Text
          mt="8"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color={"black"}
        >
          Nuestros Platos
        </Text>
        <Flex w="full" flexWrap="wrap" mt="20">
          {products.map((item, idx) => (
            <ProductAddToCart key={idx} product={item} />
          ))}
        </Flex>
      </Container>
      <Container maxWidth="container.xl">
        <Stack direction="row" py={6} px={8}>
          <Divider />
        </Stack>
      </Container>
      <Container maxWidth="container.xl">
        <Text
          textAlign="center"
          fontSize="4xl"
          lineHeight="tight"
          fontWeight="bold"
          color={"black"}
          mt="10"
          mb="5"
        >
          ¿Como funciona?
        </Text>
        <Box p={4}>
          <FeatureCard />
        </Box>
      </Container>
      <Newsletter />
      <FooterHome />
    </Box>
  );
};

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

const mapStateToProps = (state) => ({
  settings: state.settings,
  product: state.product,
  category: state.category,
});

export default connect(mapStateToProps, {
  getSettings,
  getProducts,
  getCategories,
})(HomeScreen);
