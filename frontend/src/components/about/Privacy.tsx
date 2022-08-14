import { Heading, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { BackButton } from "../common/BackButton";

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
