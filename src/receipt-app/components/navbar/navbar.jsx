// Styles
import { Link } from "react-router-dom";

import "./navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar flex justify-content-between align-items-center px-5">
        <h1>Receipt App</h1>
        <ul className="flex gap-4">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/receipts">Receipts</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export { Navbar };
