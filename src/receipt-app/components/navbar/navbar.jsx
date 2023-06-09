// React Stuff
import { Link, useNavigate } from "react-router-dom";

// Styles
import "./navbar.css";



function Navbar() {

  // Consts
  const navigate = useNavigate();
  
  // Methods
  function signOut() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  // Templates
  return (
    <>
      <nav className="navbar flex justify-content-between align-items-center px-5">
        <h1>Receipt App</h1>
        <ul className="flex gap-4 align-items-baseline">
          <li>
            <Link to="/home" className="custom-link">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/receipts" className="custom-link">
              <span>Receipt</span>
            </Link>
          </li>
          <li>
            <i onClick={signOut} className="bi bi-box-arrow-in-right text-xl"></i>
          </li>
        </ul>
      </nav>
    </>
  );
}

export { Navbar };
