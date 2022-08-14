import * as React from "react";
import { VStack, Text, Heading } from "@chakra-ui/react";
import { BackButton } from "../common/BackButton";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Privacy = React.memo((): JSX.Element => {
  const location = useLocation();
  const { t } = useTranslation("privacy");

  return (
    <VStack marginLeft="10" marginRight="10" align="left">
      <BackButton previousPath={location.pathname} />
      <Heading>{t("title")}</Heading>
      <Text>{t("body")}</Text>
    </VStack>
  );
});

export { Privacy };
