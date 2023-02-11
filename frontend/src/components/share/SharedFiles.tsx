import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { axiosInstance as axios } from "../../axios";
import { FileCard, IFileCard } from "./FileCard";

interface ISharedFiles {
  session: string;
}

interface ISharedFilesState {
  files: [IFileCard];
}

const SharedFiles = React.memo(({ session }: ISharedFiles): JSX.Element => {
  const { t } = useTranslation("share");
  const backgroundColor = useColorModeValue("gray.100", "gray.600");

  const [sharedFiles, setSharedFiles] = React.useState<
    ISharedFilesState | undefined
  >();

  React.useEffect(() => {
    pullSharedFile({ session })
    const interval = setInterval(() => pullSharedFile({ session }), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [session]);

  const pullSharedFile = async ({ session }: ISharedFiles) => {
    await axios.get(`upload/${session}`).then((res) => {
      setSharedFiles({ files: res.data });
    });
  };

  return (
    <Flex
      borderRadius="md"
      direction="column"
      width="full"
      height="52"
      marginBottom="10"
      backgroundColor={backgroundColor}
      overflowY="auto"
    >
      <Text padding="3" fontWeight="bold">
        {t("sharedFileAreaTitle")}
      </Text>
      {sharedFiles === undefined
        ? null
        : sharedFiles.files.map((file: IFileCard, index: number) => {
            return (
              <FileCard
                fileName={file.fileName}
                createdAt={file.createdAt}
                session={session}
                key={index}
              />
            );
          })}
    </Flex>
  );
});

export { SharedFiles };
