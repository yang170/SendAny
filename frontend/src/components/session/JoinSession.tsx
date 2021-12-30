import * as React from "react";
import { Button, Center, Input, Text, Flex, Spacer } from "@chakra-ui/react";
import { BackToSelectButton } from "./BackToSelectButton";

const JoinSession = React.memo((): JSX.Element => {
  return (
    <Center width="full" paddingTop="20vh">
      <Flex direction="column" width="3xl" height="16em" margin="3">
        <BackToSelectButton />
        <Text fontSize="xl">Session ID</Text>
        <Spacer />
        <Input></Input>
        <Spacer />
        <Text fontSize="xl">Session Password</Text>
        <Spacer />
        <Input placeholder="Optional"></Input>
        <Spacer />
        <Button colorScheme="teal" width={["100%", null, "35%"]} marginTop="2">
          Join
        </Button>
      </Flex>
    </Center>
  );
});

export { JoinSession };
