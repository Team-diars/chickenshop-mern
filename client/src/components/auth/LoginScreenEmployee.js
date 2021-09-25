import { connect } from "react-redux";
import React from "react";
import { useState } from "react";
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
    <Container maxWidth="container.xl" paddingTop="10">
      <Flex align="center" justifyContent="center">
        <Box width="md" height="auto" p={4} borderWidth="1px" borderRadius="md">
          <Text
            my={2}
            fontSize="2xl"
            textAlign="center"
            fontWeight="bold"
            lineHeight="short"
          >
            Sign In
          </Text>
          <form onSubmit={(e) => onSubmit(e)}>
            <FormControl mt={3}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              ></Input>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              ></Input>
            </FormControl>
            <Button
              mt={4}
              colorScheme="blue"
              size="md"
              type="submit"
              variant="solid"
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { auth })(LoginScreenEmployee);
