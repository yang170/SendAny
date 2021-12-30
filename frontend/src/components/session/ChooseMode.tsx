import * as React from "react";
import { Button, Center, Text, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ChooseMode = React.memo((): JSX.Element => {
  let nevigate = useNavigate();

  const handleCreateClick = (): void => {
    nevigate("/create");
  };

  const handleJoinClick = (): void => {
    nevigate("/join");
  };

  return (
    <Center width="full" paddingTop="30vh">
      <Flex
        direction="column"
        justify="center"
        width="3xl"
        height="9em"
        margin="3"
      >
        <Text fontSize="xl">Welcome to SendAny</Text>
        <Spacer />
        <Button colorScheme="teal" onClick={handleCreateClick}>
          Create a Session
        </Button>
        <Spacer />
        <Button colorScheme="teal" onClick={handleJoinClick}>
          Join a Session
        </Button>
      </Flex>
    </Center>
  );
});

export { ChooseMode };
