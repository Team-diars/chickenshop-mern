import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSettings, updateSettings } from "../../actions/settings";
// import { Button, Container, Form, Row } from 'react-bootstrap'
import FormContainer from "../auth/FormContainer";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

const SettingsScreen = ({
  updateSettings,
  getSettings,
  settings: { settings: _settings, loading },
}) => {
  
  const [formData, setFormData] = useState({
    address: "",
    telephone: "",
    email: "",
    facebook: "",
    instagram: "",
  });
  const { address, telephone, email, facebook, instagram } = formData;
  const [displaySocialInputs, toggleSocialInputs] = useState();
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
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmitSettings = (e) => {
    e.preventDefault();
    updateSettings({ address, email, telephone, facebook, instagram });
    // setFormData({name:'',address:'',telephone:"",facebook:""})
  };
  return (
    <Container>
      <Text fontSize="2xl" fontWeight="semibold" marginBottom="10">
        Settings
      </Text>
      <Box p="4" borderWidth="1px" borderRadius="md">
        <FormControl controlId="address" marginBottom="3">
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            placeholder="Enter the address"
            onChange={(e) => onChange(e)}
            value={address}
          ></Input>
        </FormControl>
        <FormControl controlId="telephone" marginBottom="3">
          <FormLabel>Telephone</FormLabel>
          <Input
            type="text"
            placeholder="Enter shop telephone"
            name="telephone"
            onChange={(e) => onChange(e)}
            value={telephone}
          ></Input>
        </FormControl>
        <FormControl controlId="email" marginBottom="3">
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Enter shop email"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
          ></Input>
        </FormControl>
        <Box py="2">
          <Button
            mr="2"
            variant="outline"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
          >
            Add Social Network Links
          </Button>
          <span>Optional</span>
        </Box>
        {displaySocialInputs && (
          <>
            <Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<i className="fab fa-facebook fa-2x mr-2"></i>}
                />
                <InputLeftAddon pl="10" children="https://facebook.com" />
                <Input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </InputGroup>
            </Flex>

            <Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<i className="fab fa-instagram fa-2x mr-2"></i>}
                />
                <InputLeftAddon pl="10" children="https://instagram.com" />
                <Input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </InputGroup>
            </Flex>
          </>
        )}
        <Button
          colorScheme="blue"
          mt="4"
          type="submit"
          onClick={onSubmitSettings}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

SettingsScreen.propTypes = {
  getSettings: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getSettings, updateSettings })(
  SettingsScreen
);
