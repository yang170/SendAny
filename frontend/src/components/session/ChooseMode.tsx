import { Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChooseMode = React.memo((): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation("chooseMode");

  const handleCreateClick = (): void => {
    navigate("/create");
  };

  const handleJoinClick = (): void => {
    navigate("/join");
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
