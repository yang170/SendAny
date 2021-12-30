import * as React from "react";
import {
  Alert,
  Button,
  Center,
  Input,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { BackToSelectButton } from "./BackToSelectButton";

const CreateSession = React.memo((): JSX.Element => {
  return (
    <Center width="full" paddingTop="20vh">
      <Flex
        direction="column"
        justify="center"
        width="3xl"
        height="15em"
        margin="3"
      >
        <BackToSelectButton />
        <Text fontSize="xl">Set Session Password</Text>
        <Spacer />
        <Input placeholder="Optional"></Input>
        <Spacer />
        <Alert status="info">
          Password is optional, anyone can join your session if no password is
          provided
        </Alert>
        <Spacer />
        <Button colorScheme="teal" width={["100%", null, "35%"]}>
          Create
        </Button>
      </Flex>
    </Center>
  );
});

export { CreateSession };
