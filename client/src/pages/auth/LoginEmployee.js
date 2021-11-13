import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth } from "../../actions/auth";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Box,
  Container,
  Stack,
  Checkbox,
  Link,
} from "@chakra-ui/react";

const LoginScreenEmployee = ({ auth, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    auth(email, password);
  };
  //* Redirect if logged in
  //* Login.js
  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }
  return (
    <Container paddingY="10">
      <Text
        fontSize="3xl"
        textAlign="center"
        fontWeight="bold"
        lineHeight="short"
        marginBottom="6"
      >
        Iniciar Sesión
      </Text>
      {/* <Text textAlign="center" fontSize={"lg"} color={"gray.600"}>
            ✌️
          </Text> */}
      <Box
        marginX="auto"
        width={["100%", "sm"]}
        height="auto"
        py={8}
        px={6}
        my="3"
        borderWidth="1px"
        borderRadius="md"
        boxShadow={"lg"}
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Ingresa tu email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            ></Input>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            ></Input>
          </FormControl>
          {/* <Stack
              marginTop="4"
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Recuérdame</Checkbox>
              <Link color={"blue.500"}>olvidaste tu contraseña?</Link>
            </Stack> */}
          <Box mt="5" textAlign="right">
            <Button w={"full"} colorScheme="blue" type="submit" variant="solid">
              Ingresar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { auth })(LoginScreenEmployee);
