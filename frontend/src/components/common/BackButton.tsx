import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = React.memo((): JSX.Element => {
  const nevigate = useNavigate();
  const { t } = useTranslation("common");

  const handleBackClick = (): void => {
    nevigate(-1); // previous page
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

export { BackButton };
