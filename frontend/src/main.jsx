// Importing React library
import * as React from "react";

// Importing ChakraProvider for Chakra UI styling
import { ChakraProvider } from "@chakra-ui/react";

// Importing BrowserRouter for routing
import { BrowserRouter } from "react-router-dom";

// Importing ReactDOM for rendering the React app
import * as ReactDOM from "react-dom/client";

// Importing the main App component
import App from "./App";

// Getting the root element from the HTML file
const rootElement = document.getElementById("root");

// Rendering the React app inside the root element
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Wrapping the app with BrowserRouter for routing */}
    <BrowserRouter>
      {/* Wrapping the app with ChakraProvider for Chakra UI styling */}
      <ChakraProvider>
        {/* Rendering the main App component */}
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
