import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Privacy } from "./components/about/Privacy";
import { NavBar } from "./components/nav/NavBar";
import { ChooseMode } from "./components/session/ChooseMode";
import { CreateSession } from "./components/session/CreateSession";
import { JoinSession } from "./components/session/JoinSession";
import { Share } from "./components/share/Share";
import { Path } from "./enums/path";
import { theme } from "./style/theme";

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={Path.Home} element={<ChooseMode />} />
            <Route path={Path.Create} element={<CreateSession />} />
            <Route path={Path.Join} element={<JoinSession />} />
            <Route path={Path.Share} element={<Share />} />
            <Route path={Path.Privacy} element={<Privacy />}></Route>
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
