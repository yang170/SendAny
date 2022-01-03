import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Input,
  Text,
  Flex,
  Spacer,
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { BackToSelectButton } from "./BackToSelectButton";

interface ISessionID {
  ID: string;
}

const JoinSession = React.memo((): JSX.Element => {
  const SESSION_ID_LEN = 6;
  const nevigate = useNavigate();
  const toast = useToast();
  const [session, setSession] = React.useState<ISessionID>({
    ID: "",
  });

  const toastError = (title?: string, detail?: string) => {
    toast({
      position: "top",
      title: title ? title : "Something went wrong",
      description: detail ? detail : "Please try again later",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSessionChange = (value: string) => {
    const nextSession = { ...session };
    nextSession.ID = value;
    nextSession.ID = nextSession.ID.toUpperCase();
    setSession(nextSession);
  };

  const handleJoinButtonClick = () => {
    if (session.ID.length < SESSION_ID_LEN) {
      toastError("Session ID is invalid", "Please fill the session ID");
      return;
    }

    axios.get(`session/${session.ID}`).then((res) => {
      if (res.data.message === false) {
        toastError(
          "Session ID or password is incorrect",
          "Please enter the correct session ID and password"
        );
        return;
      } else {
        const sessionNumber = res.data.sessionNumber;
        nevigate("/share", {
          replace: true,
          state: { session: sessionNumber },
        });
      }
    });
  };

  return (
    <Center width="full" paddingTop="20vh">
      <Flex direction="column" width="3xl" height="16em" margin="3">
        <BackToSelectButton />
        <Text fontSize="xl">Session ID</Text>
        <Spacer />
        <HStack>
          <PinInput
            type="alphanumeric"
            onChange={handleSessionChange}
            value={session.ID}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Spacer />
        <Text fontSize="xl">Session Password</Text>
        <Spacer />
        <Input placeholder="Optional"></Input>
        <Spacer />
        <Button
          colorScheme="teal"
          width={["100%", null, "35%"]}
          onClick={handleJoinButtonClick}
          marginTop="2"
        >
          Join
        </Button>
      </Flex>
    </Center>
  );
});

export { JoinSession };
