import * as React from "react";
import { axiosInstance as axios } from "../../axios";
import {
  Box,
  Button,
  Textarea,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AttachmentIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

interface IShareBar {
  session: string;
}

const ShareBar = React.memo(({ session }: IShareBar): JSX.Element => {
  const inputFile: React.MutableRefObject<null | HTMLInputElement> =
    React.useRef(null);
  const [text, setText] = React.useState("");
  const toast = useToast();

  const handleAttachFileClick = () => {
    // `current` points to the mounted file input element
    if (inputFile !== null && inputFile.current !== null) {
      inputFile.current.click();
    }
  };

  const toastSuccess = (title: string, detail: string) => {
    toast({
      position: "top",
      title: title,
      description: detail,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const toastError = (title?: string, detail?: string) => {
    toast({
      position: "top",
      title: title ? title : "Something went wrong",
      description: detail ? detail : "Please try again later",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAttchFileUpload = () => {
    if (
      inputFile !== null &&
      inputFile.current !== null &&
      inputFile.current.files !== null &&
      inputFile.current.files[0] !== undefined
    ) {
      console.log(inputFile.current.files[0]);

      const FILE_SIZE_LIMIG = 20000000;
      if (inputFile.current.files[0].size > FILE_SIZE_LIMIG) {
        toastError(
          "File is too large",
          `Size limit is ${FILE_SIZE_LIMIG / 1000000} MB`
        );
        return;
      }

      const formData = new FormData();
      formData.append("attachment", inputFile.current.files[0]);
      formData.append("session_number", session);
      axios
        .post("upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastSuccess("File uploaded", "We've shared the file for you");
        })
        .catch((err) => {
          toastError();
        });
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLElement>) => {
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      inputFile !== null &&
      inputFile.current !== null
    ) {
      e.preventDefault();
      inputFile.current.files = e.dataTransfer.files;
      handleAttchFileUpload();
      e.dataTransfer.clearData();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleShareText = () => {
    if (text.length === 0) {
      toastError("Text is empty", "Please type something before share it");
      return;
    }

    axios
      .post("text", { session_number: session, content: text })
      .then((res) => {
        toastSuccess("Text shared", "We've shared the text for you");
      })
      .catch((err) => {
        toastError();
      });
  };

  const handleClearText = () => {
    setText("");
  };

  return (
    <Flex direction="column" width="full">
      <Box borderRadius="md"></Box>
      <Textarea
        marginTop="1"
        placeholder="Type or drop files here"
        value={text}
        onDrop={handleFileDrop}
        onChange={handleTextChange}
      />
      <HStack marginTop="3">
        <Button
          colorScheme="blue"
          leftIcon={<AttachmentIcon />}
          onClick={handleAttachFileClick}
          width="min"
        >
          Share a file
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleClearText}
          leftIcon={<CloseIcon />}
          width="min"
        >
          Clear Text
        </Button>
        <Button
          colorScheme="green"
          onClick={handleShareText}
          leftIcon={<CheckIcon />}
          width="min"
        >
          Share Text
        </Button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
      </HStack>
    </Flex>
  );
});

export { ShareBar };
