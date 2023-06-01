import { Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../src/receipt-app/pages/home-page/home-page";
import { ReceiptPage } from "../src/receipt-app/pages/receipt-page/receipt-page";

// Components
import { Navbar } from "./receipt-app/components/navbar/navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/receipts" element={<ReceiptPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}


export default App;