import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";


// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// React API
import PrimeReact from 'primereact/api';
        

PrimeReact.appendTo = "self";
PrimeReact.ripple = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/receipt-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

