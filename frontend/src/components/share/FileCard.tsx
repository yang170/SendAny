import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

export interface IFileCard {
  fileName: string;
  createdAt: string;
  session?: string;
}

const FileCard = React.memo(
  ({ fileName, createdAt }: IFileCard): JSX.Element => {
    return (
      <Flex marginLeft="3" marginBottom="2" width="70%">
        <Text marginTop="auto" marginBlock="auto" isTruncated>
          {fileName}
        </Text>
        <IconButton
          aria-label="download"
          colorScheme="blue"
          width="min"
          icon={<DownloadIcon />}
          float="right"
          marginLeft="auto"
        />
      </Flex>
    );
  }
);

export { FileCard };
