import { Flex, Box, Image, useColorModeValue } from "@chakra-ui/react";

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

function CategoryCard(props) {
  const data = {
    isNew: props.product.status,
    imageURL: props.product.image,
    name: props.product.name,
    price: props.product.price,
    rating: 4.2,
    numReviews: 34,
  };
  return (
    <Box width={[40, 48]}>
      <Box
        as="a"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        href={data.name}
        bg={useColorModeValue("white", "gray.800")}
        // maxHeight="200px"
        position="relative"
      >
        {/* {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="yellow.200"
          />
        )} */}

        <Image
          rounded="full"
          boxSize="150px"
          objectFit="cover"
          src={`/images/${data.imageURL}`}
          alt={data.name}
        />

        <Box py="3" px="4">
          {/* <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box> */}
          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="lg"
              fontWeight="semibold"
              as="p"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            {/* <chakra.a href={"#"} display={"flex"}>
              <Icon as={FiEye} h={7} w={7} alignSelf={"center"} />
            </chakra.a> */}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default CategoryCard;
