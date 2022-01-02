import * as React from "react";
import { Tag, Flex, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import { ShareBar } from "./ShareBar";
import { SharedFiels } from "./SharedFiles";
import { SharedText } from "./SharedText";

interface ISessionLocation {
  session: string;
}

const Share = React.memo((): JSX.Element => {
  const { state } = useLocation();
  const session = (state as ISessionLocation).session;

  return (
    <Flex margin="3" direction="column">
      <Tag size="lg" width="fit-content" marginBottom="5">
        <TagLeftIcon as={InfoIcon} />
        <TagLabel>Session ID: {session}</TagLabel>
      </Tag>
      <SharedFiels session={session} />
      <SharedText session={session} />
      <ShareBar session={session} />
    </Flex>
  );
});

export { Share };
