import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import { Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export interface IFileCard {
  fileName: string;
  createdAt: string;
  session?: string;
}

const FileCard = React.memo(
  ({ fileName, createdAt, session }: IFileCard): JSX.Element => {
    const { t } = useTranslation(["common"]);
    const toast = useToast();

    const toastError = (title?: string, detail?: string) => {
      toast({
        position: "top",
        title: title ? title : t("errMsgTitleGeneric"),
        description: detail ? detail : t("errMsgDetailGeneric"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    };

    const handleDownload = () => {
      if (session === null) {
        toastError();
        return;
      }

      axios
        .get(`download/${session}/${fileName}`, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
          toastError();
        });
    };

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
          onClick={handleDownload}
          marginLeft="auto"
        />
      </Flex>
    );
  }
);

export { FileCard };
