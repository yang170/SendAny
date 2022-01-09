import * as React from "react";
import { Button, Center, Text, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChooseMode = React.memo((): JSX.Element => {
  const nevigate = useNavigate();
  const { t } = useTranslation("chooseMode");

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
        height="10em"
        margin="3"
      >
        <Text fontSize="xl">{t("welcome")}</Text>
        <Text fontSize="lg" as="span">
          {t("intro")}
        </Text>
        <Spacer />
        <Button colorScheme="teal" onClick={handleCreateClick}>
          {t("create")}
        </Button>
        <Spacer />
        <Button colorScheme="teal" onClick={handleJoinClick}>
          {t("join")}
        </Button>
      </Flex>
    </Center>
  );
});

export { ChooseMode };
