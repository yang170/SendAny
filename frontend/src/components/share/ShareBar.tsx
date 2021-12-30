import * as React from "react";
import { Box, Button, Textarea, HStack, Flex } from "@chakra-ui/react";
import { AttachmentIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

const ShareBar = React.memo((): JSX.Element => {
  const inputFile: React.MutableRefObject<null | HTMLInputElement> =
    React.useRef(null);

  const handleAttachFileClick = () => {
    // `current` points to the mounted file input element
    if (inputFile !== null && inputFile.current !== null) {
      inputFile.current.click();
    }
  };

  const handleAttchFileUpload = () => {
    if (
      inputFile !== null &&
      inputFile.current !== null &&
      inputFile.current.files !== null &&
      inputFile.current.files[0] !== undefined
    ) {
      console.log(inputFile.current.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLElement>) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <Flex direction="column" width="full">
      <Box borderRadius="md"></Box>
      <Textarea
        marginTop="1"
        placeholder="Type or drop files here"
        onDrop={handleFileDrop}
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
        <Button colorScheme="blue" leftIcon={<CloseIcon />} width="min">
          Clear Text
        </Button>
        <Button colorScheme="green" leftIcon={<CheckIcon />} width="min">
          Share Text
        </Button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={handleAttchFileUpload}
          style={{ display: "none" }}
        />
      </HStack>
    </Flex>
  );
});

export { ShareBar };
