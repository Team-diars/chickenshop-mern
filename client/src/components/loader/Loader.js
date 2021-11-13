import React from "react";

import { Center, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Center flex="1">
      <Spinner label="cargando" speed="0.65s" />
    </Center>
  );
};
