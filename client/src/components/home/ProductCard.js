import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  GridItem,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <Box
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <Box key={i} style={{ marginLeft: "1" }} />;
          }
          return <Box key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function ProductAddToCart(props) {
  const data = {
    isNew: props.product.status,
    imageURL: props.product.image,
    name: props.product.name,
    price: props.product.price,
    rating: 4.2,
    numReviews: 34,
  };
  return (
    <Box width="full">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxHeight="320px"
        borderWidth="1px"
        rounded="xl"
        shadow="lg"
        transition="all .2s ease-in"
        _hover={{
          shadow: "md",
          bg: useColorModeValue("yellow.50", "yellow.700"),
        }}
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="yellow.200"
          />
        )}

        <Image
          marginTop="-10"
          rounded="full"
          boxSize="150px"
          objectFit="cover"
          src={`/images/${data.imageURL}`}
          alt={data.name}
        />

        <Box py="6" px="4" width="full">
          {/* <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box> */}
          <Flex mt="1" justifyContent="center" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              marginBottom="10px"
            >
              {data.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="md" mr="1">
                S/
              </Box>
              {data.price.toFixed(2)}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={FiShoppingCart} h={5} w={5} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
            {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductAddToCart;
