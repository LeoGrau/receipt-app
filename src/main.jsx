import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

// Pages


// Primeflex
import "primeflex/primeflex.css";

// Primereact Components

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/receipt-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
