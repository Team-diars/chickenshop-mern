import { useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from "@chakra-ui/react";

export default function Simple() {
  const [email, setEmail] = useState("");
  //   const [state, setState] =
  //     (useState < "initial") | "submitting" | ("success" > "initial");
  const [error, setError] = useState(false);

  return (
    <Flex bg="blackAlpha.800" align={"center"} justify={"center"} py={12}>
      <Container
        maxWidth={"lg"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        direction={"column"}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          Suscribete a nuestras promociones!
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            // setState("submitting");

            // remove this code and implement your submit logic right here
            setTimeout(() => {
              if (email === "fail@example.com") {
                setError(true);
                // setState("initial");
                return;
              }

              //   setState("success");
            }, 1000);
          }}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={2}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"email"}
              type={"email"}
              required
              placeholder={"Email"}
              aria-label={"Email"}
              value={email}
              //   disabled={state !== "initial"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={"yellow"}
              //   isLoading={"submitting"}
              w="100%"
              type={"button"}
            >
              {"Enviar"}
            </Button>
            {/* <Button
              colorScheme={state === "success" ? "green" : "blue"}
              isLoading={state === "submitting"}
              w="100%"
              type={state === "success" ? "button" : "submit"}
            >
              {state === "success" ? <CheckIcon /> : "Submit"}
            </Button> */}
          </FormControl>
        </Stack>
        {/* <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          {error
            ? "Oh no an error occured! 😢 Please try again later."
            : "You won't receive any spam! ✌️"}
        </Text> */}
      </Container>
    </Flex>
  );
}
