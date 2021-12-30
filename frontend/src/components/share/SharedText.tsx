import * as React from "react";
import {
  HStack,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const SharedText = React.memo((): JSX.Element => {
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
      <HStack margin="3">
        <Text as="span" fontWeight="bold">
          SHARED TEXT
        </Text>
        <IconButton
          aria-label="Copy"
          colorScheme="blue"
          variant="ghost"
          icon={<CopyIcon />}
        />
      </HStack>
    </Flex>
  );
});

export { SharedText };
