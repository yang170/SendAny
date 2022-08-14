import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import { AxiosResponse } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
import { BackButton } from "../common/BackButton";
import { useTranslation } from "react-i18next";

const CreateSession = React.memo((): JSX.Element => {
  const nevigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("createSession");

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
        <BackButton previousPath={location.pathname} />
        <Text fontSize="xl">{t("title")}</Text>
        <Spacer />
        <Input placeholder={t("passwordPlaceholder")}></Input>
        <Spacer />
        <Alert borderRadius="md" status="info">
          <AlertIcon />
          {t("passwordNotice")}
        </Alert>
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={handleCreateButtonClick}
          width={["100%", null, "35%"]}
        >
          {t("createButton")}
        </Button>
      </Flex>
    </Center>
  );
});

export { CreateSession };
