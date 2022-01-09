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
import { useTranslation } from "react-i18next";

interface ISessionID {
  ID: string;
}

const JoinSession = React.memo((): JSX.Element => {
  const SESSION_ID_LEN = 6;
  const nevigate = useNavigate();
  const { t } = useTranslation(["joinSession", "common"]);
  const toast = useToast();
  const [session, setSession] = React.useState<ISessionID>({
    ID: "",
  });

  const toastError = (title?: string, detail?: string) => {
    toast({
      position: "top",
      title: title ? title : t("errMsgTitleGeneric", { ns: "common" }),
      description: detail ? detail : t("errMsgDetailGeneric", { ns: "common" }),
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
      toastError(t("errMsgTitleInvalidID"), t("errMsgDetailInvalidID"));
      return;
    }

    axios
      .get(`session/${session.ID}`)
      .then((res) => {
        if (res.data.message === false) {
          toastError(t("errMsgTitleIncorrect"), t("errMsgDetailIncorrect"));
          return;
        } else {
          const sessionNumber = res.data.sessionNumber;
          nevigate("/share", {
            replace: true,
            state: { session: sessionNumber },
          });
        }
      })
      .catch(() => {
        toastError();
      });
  };

  return (
    <Center width="full" paddingTop="20vh">
      <Flex direction="column" width="3xl" height="16em" margin="3">
        <BackToSelectButton />
        <Text fontSize="xl">{t("rid")}</Text>
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
        <Text fontSize="xl">{t("rpwd")}</Text>
        <Spacer />
        <Input placeholder={t("passwordPlaceholder")}></Input>
        <Spacer />
        <Button
          colorScheme="teal"
          width={["100%", null, "35%"]}
          onClick={handleJoinButtonClick}
          marginTop="2"
        >
          {t("join")}
        </Button>
      </Flex>
    </Center>
  );
});

export { JoinSession };
