import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { axiosInstance as axios } from "../../axios";
import { Path } from "../../enums/path";
import { BackButton } from "../common/BackButton";

const CreateSession = React.memo((): JSX.Element => {
  const nevigate = useNavigate();
  const { t } = useTranslation("createSession");

  const handleCreateButtonClick = () => {
    axios.get("session").then((res: AxiosResponse) => {
      const sessionNumber = res.data.sessionNumber;
      nevigate(`/${Path.Share}`, {
        replace: true,
        state: { session: sessionNumber },
      });
    });
  };

  return (
    <Center width="full" paddingTop="27vh">
      <Flex
        direction="column"
        justify="center"
        width="3xl"
        height="15em"
        margin="3"
      >
        <BackButton />
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
