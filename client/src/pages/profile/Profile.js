import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/auth";
import {
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Container,
  Spinner,
} from "@chakra-ui/react";

const DashboardScreen = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Container paddingY="10">
      <Text
        fontSize="2xl"
        textAlign="center"
        fontWeight="bold"
        lineHeight="short"
        marginBottom="6"
      >
        Perfil
      </Text>
      <Box p="4" borderWidth="1px" borderRadius="md">
        <Flex flexDirection="column" align="center" justifyContent="center">
          {loading || user === null ? (
            <Spinner label="cargando" speed="0.65s" size="md" />
          ) : (
            <>
              <Wrap>
                <WrapItem>
                  <Avatar size="2xl" name={user.name} src={user.avatar} />{" "}
                </WrapItem>
              </Wrap>

              <Flex
                flexDirection="column"
                align="center"
                justifyContent="center"
                mt={2}
              >
                <Text
                  mt={1}
                  fontSize="md"
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight="short"
                >
                  Nombre: {user.name} {user.lastname}
                </Text>
                <Text
                  mt={1}
                  fontSize="md"
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight="short"
                >
                  DNI: {user.dni}
                </Text>
                <Text
                  mt={1}
                  fontSize="md"
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight="short"
                >
                  Rol: {user.role}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { loadUser })(DashboardScreen);
