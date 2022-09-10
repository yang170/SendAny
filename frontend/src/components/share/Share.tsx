import { DeleteIcon } from "@chakra-ui/icons";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { axiosInstance as axios } from "../../axios";
import { Path } from "../../enums/path";
import { ShareBar } from "./ShareBar";
import { SharedFiels } from "./SharedFiles";
import { SharedText } from "./SharedText";

interface ISessionLocation {
  session: string;
}

const Share = React.memo((): JSX.Element => {
  const { t } = useTranslation("share");
  const { state } = useLocation();
  const nevigate = useNavigate();
  const session = (state as ISessionLocation).session;

  const handleDeleteSession = () => {
    axios.delete("session", { data: { session_number: session } }).then(() => {
      nevigate(Path.Home);
    }).catch(() => {
      nevigate(Path.Home);
    });
  };

  return (
    <Flex margin="3" direction="column">
      <HStack marginBottom="5">
        <Tag size="lg" width="fit-content">
          <TagLeftIcon as={InfoIcon} />
          <TagLabel>
            {t("rid")} {session}
          </TagLabel>
        </Tag>
        <Button
          variant="outline"
          aria-label="Back"
          colorScheme="red"
          size="sm"
          onClick={handleDeleteSession}
          leftIcon={<DeleteIcon />}
        >
          {t("deleteRoom")}
        </Button>
      </HStack>
      <SharedFiels session={session} />
      <SharedText session={session} />
      <ShareBar session={session} />
    </Flex>
  );
});

export { Share };
