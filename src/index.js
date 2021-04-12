import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import App from "./App";
import DataProvider from "./context/DataProvider";

ReactDOM.render(
  <DataProvider>
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </DataProvider>,
  document.getElementById("root")
);
