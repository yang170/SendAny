import { Flex, HStack } from "@chakra-ui/react";
import * as React from "react";

import { About } from "./About";
import { ChooseLanguage } from "./ChooseLanguage";
import { ColorModeToggle } from "./ColorModeToggle";

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
