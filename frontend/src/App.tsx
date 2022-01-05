import React from "react";
import { theme } from "./style/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ChooseMode } from "./components/session/ChooseMode";
import { CreateSession } from "./components/session/CreateSession";
import { JoinSession } from "./components/session/JoinSession";
import { ColorModeToggle } from "./components/colorMode/ColorModeToggle";
import { Share } from "./components/share/Share";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeToggle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChooseMode />} />
          <Route path="create" element={<CreateSession />} />
          <Route path="join" element={<JoinSession />} />
          <Route path="share" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
