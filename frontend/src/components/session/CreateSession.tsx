import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Input,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { BackToSelectButton } from "./BackToSelectButton";

const CreateSession = React.memo((): JSX.Element => {
  const nevigate = useNavigate();

  const handleCreateButtonClick = () => {
    axios.get("session").then((res: AxiosResponse) => {
      const sessionNumber = res.data.sessionNumber;
      nevigate("/share", {
        replace: true,
        state: { session: sessionNumber },
      });
    });
  };

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
        <Alert borderRadius="md" status="info">
          <AlertIcon />
          Password is optional, anyone can join your session if no password is
          provided
        </Alert>
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={handleCreateButtonClick}
          width={["100%", null, "35%"]}
        >
          Create
        </Button>
      </Flex>
    </Center>
  );
});

export { CreateSession };
