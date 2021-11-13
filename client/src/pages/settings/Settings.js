import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSettings, updateSettings } from "./../../actions/settings";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SettingsScreen = ({
  updateSettings,
  getSettings,
  settings: { settings: _settings, loading },
}) => {
  const [displaySocialInputs, toggleSocialInputs] = useState(true);

  const settingsSchema = Yup.object().shape({
    appname: Yup.string(),
    address: Yup.string(),
    telephone: Yup.string(),
    email: Yup.string().email("Ingresa un email valido"),
    social_links: Yup.object({
      facebook: Yup.string().url("Ingresa la url de Facebook"),
      instagram: Yup.string().url("Ingresa la url de Instagram"),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      appname: "",
      address: "",
      telephone: "",
      email: "",
      social_links: { facebook: "", instagram: "" },
    },
  });
  const submitSettings = (values) => {
    console.log("Data:", values);
    return new Promise((resolve) => {
      setTimeout(() => {
        updateSettings({
          appname: values.appname,
          address: values.address,
          email: values.email,
          telephone: values.telephone,
          facebook: values.social_links.facebook,
          instagram: values.social_links.instagram,
        });
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    getSettings();
  }, [getSettings]);
  useEffect(() => {
    if (!loading && _settings) {
      for (const value in _settings) {
        setValue(value, _settings[value] || "");
      }
    }
  }, [_settings, loading]);
  return (
    <Container paddingY="10">
      <Text
        fontSize="2xl"
        // textAlign="center"
        fontWeight="bold"
        lineHeight="short"
        marginBottom="6"
      >
        Ajustes de Contacto
      </Text>
      <form onSubmit={handleSubmit(submitSettings)}>
        <Box p="4" borderWidth="1px" borderRadius="md">
          <FormControl marginBottom="3" isInvalid={errors.appname}>
            <FormLabel>Nombre Restaurante</FormLabel>
            <Input
              type="text"
              name="appname"
              placeholder="Ingresa un nombre"
              // onChange={(e) => onChange(e)}
              // value={appname}
              {...register("appname")}
            />
            {errors.appname && errors.appname.message ? (
              <FormErrorMessage>{errors.appname.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl marginBottom="3" isInvalid={errors.address}>
            <FormLabel>Direccion</FormLabel>
            <Input
              type="text"
              name="address"
              placeholder="Ingresa una direccion"
              // onChange={(e) => onChange(e)}
              // value={address}
              {...register("address")}
            />
            {errors.address && errors.address.message ? (
              <FormErrorMessage>{errors.address.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl marginBottom="3" isInvalid={errors.telephone}>
            <FormLabel>Telefono</FormLabel>
            <Input
              type="text"
              placeholder="Ingresa de numero de telefono"
              name="telephone"
              // onChange={(e) => onChange(e)}
              // value={telephone}
              {...register("telephone")}
            />
            {errors.telephone && errors.telephone.message ? (
              <FormErrorMessage>{errors.telephone.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl marginBottom="3" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              placeholder="Ingresa un email"
              name="email"
              // onChange={(e) => onChange(e)}
              // value={email}
              {...register("email")}
            />
            {errors.email && errors.email.message ? (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : null}
          </FormControl>
          <Box py="2">
            <Button
              colorScheme="gray"
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
            >
              Agregar redes sociales
            </Button>
            <Box as="span" marginLeft="2" fontSize="sm" fontStyle="italic">
              Opcional
            </Box>
          </Box>
          {displaySocialInputs && (
            <>
              <Stack spacing={2}>
                <FormControl isInvalid={errors.social_links?.facebook}>
                  <InputGroup size="md">
                    {/* <InputLeftElement
                  pointerEvents="none"
                  children={<FaFacebook />}
                /> */}
                    <InputLeftAddon children={<FaFacebook />} />
                    <Input
                      type="text"
                      placeholder="Facebook URL"
                      name="facebook"
                      // onChange={(e) => onChange(e)}
                      // value={facebook}
                      {...register("social_links.facebook")}
                    />
                  </InputGroup>
                  {errors.social_links?.facebook &&
                  errors.social_links.facebook.message ? (
                    <FormErrorMessage>
                      {errors.social_links.facebook.message}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={errors.social_links?.instagram}>
                  <InputGroup size="md">
                    {/* <InputLeftElement
                  pointerEvents="none"
                  children={<FaInstagram />}
                /> */}
                    <InputLeftAddon children={<FaInstagram />} />
                    <Input
                      type="text"
                      placeholder="Instagram URL"
                      name="instagram"
                      // onChange={(e) => onChange(e)}
                      // value={instagram}
                      {...register("social_links.instagram")}
                    />
                  </InputGroup>
                  {errors.social_links?.instagram &&
                  errors.social_links?.instagram.message ? (
                    <FormErrorMessage>
                      {errors.social_links?.instagram.message}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Stack>
            </>
          )}
        </Box>
        <Box
          mt="4"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            colorScheme="blue"
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Guardar
          </Button>
        </Box>
      </form>
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
