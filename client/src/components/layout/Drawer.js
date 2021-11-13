import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

// import { MainMenu } from "@/components/layout/Header";
import { useLayoutContext } from "./LayoutContext";
// import { Logo } from '@/components';

export const NavDrawer = (props, { ...rest }) => {
  const { navIsOpen, navOnClose } = useLayoutContext();
  return (
    <Drawer
      isOpen={navIsOpen}
      placement="left"
      onClose={() => navOnClose?.()}
      {...rest}
    >
      <DrawerOverlay>
        <DrawerContent
          bg="yellow.300"
          color="blackalpha.200"
          pt="safe-top"
          pb="safe-bottom"
        >
          <DrawerCloseButton mt="safe-top" />
          <DrawerHeader>
            {props.appname}
            {/* <Logo /> */}
          </DrawerHeader>
          <DrawerBody p="2">{/* <MainMenu direction="column" /> */}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};