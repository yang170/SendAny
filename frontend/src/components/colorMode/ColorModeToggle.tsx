import * as React from "react";
import { Flex, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeToggle = React.memo((): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex width="100%">
      <IconButton
        aria-label={
          colorMode === "light" ? "Change to dark mode" : "Change to light mode"
        }
        variant="ghost"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        width="min"
        float="right"
        marginLeft="auto"
        marginTop="1"
        marginBottom="1"
        marginRight="1"
        onClick={toggleColorMode}
      />
    </Flex>
  );
});

export { ColorModeToggle };
