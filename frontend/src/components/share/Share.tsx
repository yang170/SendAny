import * as React from "react";
import { Tag, Flex, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { ShareBar } from "./ShareBar";
import { SharedFiels } from "./SharedFiles";
import { SharedText } from "./SharedText";

const Share = React.memo((): JSX.Element => {
  return (
    <Flex margin="3" direction="column">
      <Tag size="lg" width="fit-content" marginBottom="5">
        <TagLeftIcon as={InfoIcon} />
        <TagLabel>Session ID: A2F23</TagLabel>
      </Tag>
      <SharedFiels />
      <SharedText />
      <ShareBar />
    </Flex>
  );
});

export { Share };
