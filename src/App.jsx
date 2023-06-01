//import { useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../src/receipt-app/pages/home-page/home-page";
import { ReceiptPage } from "./receipt-app/pages/receipt-page/receipt-page";

// Components
import { Navbar } from "./receipt-app/components/navbar/navbar";

function App() {
  //const [count, setCount] = useState(0)
  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={HomePage}></Route>
          <Route path="/home" Component={HomePage}></Route>
          <Route path="/receipts" Component={ReceiptPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
