import * as React from "react";
import { VStack, Text, Heading } from "@chakra-ui/react";
import { BackToSelectButton } from "../session/BackToSelectButton";
import { useTranslation } from "react-i18next";

const Privacy = React.memo((): JSX.Element => {
  const { t } = useTranslation("privacy");
  return (
    <VStack marginLeft="10" marginRight="10" align="left">
      <BackToSelectButton />
      <Heading>{t("title")}</Heading>
      <Text>{t("body")}</Text>
    </VStack>
  );
});

export { Privacy };
