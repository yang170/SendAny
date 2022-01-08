import * as React from "react";
import { Flex, HStack, Link, Spacer } from "@chakra-ui/react";
import { About } from "./About";
import { ColorModeToggle } from "./ColorModeToggle";
import { ChooseLanguage } from "./ChooseLanguage";

const NavBar = React.memo((): JSX.Element => {
  return (
    <Flex width="100%">
      <HStack marginLeft="auto" marginRight="1" marginTop="2" marginBottom="1">
        <About />
        <ChooseLanguage />
        <ColorModeToggle />
      </HStack>
    </Flex>
  );
});

export { NavBar };
