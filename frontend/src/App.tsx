import * as React from "react";
import { theme } from "./style/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ChooseMode } from "./components/session/ChooseMode";
import { CreateSession } from "./components/session/CreateSession";
import { JoinSession } from "./components/session/JoinSession";
import { Share } from "./components/share/Share";
import { Privacy } from "./components/about/Privacy";
import { NavBar } from "./components/nav/NavBar";

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ChooseMode />} />
            <Route path="create" element={<CreateSession />} />
            <Route path="join" element={<JoinSession />} />
            <Route path="share" element={<Share />} />
            <Route path="privacy" element={<Privacy />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </React.Suspense>
  );
}

const Loader = () => {
  return <div></div>;
};

export default App;
