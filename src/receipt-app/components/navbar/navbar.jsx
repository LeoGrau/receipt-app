import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {

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
            <i className="bi bi-box-arrow-in-right text-xl"></i>
          </li>
        </ul>
      </nav>
    </>
  );
}

export { Navbar };
