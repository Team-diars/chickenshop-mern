import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import {
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Container,
} from "@chakra-ui/react";

const DashboardScreen = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Container maxWidth="container.xl" paddingTop="10">
      <Flex align="center" justifyContent="center">
        <Box p="5" width="520px" borderWidth="1px" borderRadius="md">
          <Text
            mt={2}
            mb={4}
            fontSize="2xl"
            textAlign="center"
            fontWeight="bold"
            lineHeight="short"
          >
            Perfil
          </Text>
          <Flex flexDirection="column" align="center" justifyContent="center">
            {loading || user === null ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Cargando...</span>
              </Spinner>
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
      </Flex>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { loadUser })(DashboardScreen);
