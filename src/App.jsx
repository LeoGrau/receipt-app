import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import { HomePage } from "../src/receipt-app/pages/home-page/home-page";
import { ReceiptPage } from "../src/receipt-app/pages/receipt-page/receipt-page";
import { LoginPage } from "./receipt-app/pages/login-page/login-page";
import { RegisterPage } from "./receipt-app/pages/register-page/register-page";

// Own Components
import { Navbar } from "./receipt-app/components/navbar/navbar";

import { useLocation } from "react-router-dom";

import "primeflex/primeflex.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import PrivateRoute from "./receipt-app/components/private-route/private-route";

function App() {
  var location = useLocation();

  function showNavbar() {
    var pathname = location.pathname.substring(1);
    console.log(pathname);
    return pathname != "login" && pathname != "register";
  }
  // element={<LoginPage />}
  return (
    <>
      {showNavbar() && <Navbar/> }
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
        </Route>
        <Route exact path="/home" element={<PrivateRoute />}>
          <Route exact path="/home" element={<HomePage />} />
        </Route>
        <Route exact path="/receipts" element={<PrivateRoute />}>
          <Route exact path="/receipts" element={<ReceiptPage />} />
        </Route>
        <Route path="/login" element={localStorage.getItem("user") ? <Navigate to="/" /> : <LoginPage />}></Route>
        <Route path="/register" element={localStorage.getItem("user") ? <Navigate to="/" /> : <RegisterPage />}></Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
