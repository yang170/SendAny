import * as React from "react";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
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
        onClick={toggleColorMode}
      />
    </Flex>
  );
});

export { ColorModeToggle };
