import * as React from "react";
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

const SharedFiels = React.memo((): JSX.Element => {
  const backgroundColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Flex
      borderRadius="md"
      direction="column"
      width="full"
      minHeight="52"
      marginBottom="10"
      backgroundColor={backgroundColor}
    >
      <Text padding="3" fontWeight="bold">
        SHARED FILES
      </Text>
      <IconButton aria-label="download" width="min" icon={<DownloadIcon />} />
    </Flex>
  );
});

export { SharedFiels };
