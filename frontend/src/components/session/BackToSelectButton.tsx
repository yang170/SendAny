import * as React from "react";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BackToSelectButton = React.memo((): JSX.Element => {
  const nevigate = useNavigate();
  const { t } = useTranslation("common");

  const handleBackClick = (): void => {
    nevigate("/");
  };

  return (
    <Button
      aria-label="Back to mode selection"
      variant="ghost"
      leftIcon={<ArrowBackIcon />}
      width="min"
      marginBottom="1"
      paddingLeft="-4"
      onClick={handleBackClick}
    >
      {t("back")}
    </Button>
  );
});

export { BackToSelectButton };
