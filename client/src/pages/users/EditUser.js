import React, { useEffect, useState } from "react";
import { ModalBody, ModalFooter, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserByID, updateUser } from "../../actions/user";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiArrowLeft, FiFile } from "react-icons/fi";
import { Loader } from "./../../components/loader/Loader";

const EditUser = ({
  history,
  getUserByID,
  updateUser,
  user: { user, loading },
  match,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    lastname: "",
    dni: "",
    password: "",
  });
  const getUser = (id) => {
    getUserByID(id);
  };
  useEffect(() => {
    getUser(match.params.id);
  }, [match.params.id]);
  useEffect(() => {
    if (!loading && user) {
      setFormData({
        _id: match.params.id || "",
        name: user.name || "",
        lastname: user.lastname || "",
        dni: user.dni || "",
        password: user.password || "",
      });
    }
  }, [user, loading]);
  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  return (
    <Container paddingY="10">
      <Box
        display="flex"
        alignItems="center"
        marginBottom="6"
        position="relative"
      >
        <Button as={ReachLink} to="/users" mr={[3, 5]} variant="ghost">
          <Icon as={FiArrowLeft} h={[5, 6]} w={[5, 6]} alignSelf={"center"} />
        </Button>
        <Text
          fontSize="2xl"
          textAlign="center"
          fontWeight="bold"
          lineHeight="short"
        >
          Editar Usuario
        </Text>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box p="4" borderWidth="1px" borderRadius="md">
            <FormControl marginBottom="3">
              <FormLabel>Empleado</FormLabel>
              <Select
                as="select"
                name="role"
                onChange={(e) => onChange(e)}
                custom
                disabled
              >
                <option>
                  {formData.name} {formData.lastname} | {formData.dni}
                </option>
              </Select>
            </FormControl>
            <FormControl marginBottom="3">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value=""
                // value={formData.password}
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </Box>
          <Box
            mt="4"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* <Button as={ReachLink} to="/users" mr={3} variant="ghost">
              <Icon
                as={FiArrowLeft}
                h={[4, 6]}
                w={[4, 6]}
                alignSelf={"center"}
              />
            </Button> */}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => updateUser(match.params.id, formData, history)}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
EditUser.propTypes = {
  getUserByID: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getUserByID, updateUser })(EditUser);
