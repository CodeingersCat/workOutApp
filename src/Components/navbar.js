import React, {useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg py-2 px-5">
      <Link to="/" className="navbar-brand" style={{outline: "none"}}>
        <p className="h2 border border-danger pt-2 pb-3 px-3" >W O R K __ O U T</p>
      </Link>
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse justify-content-end`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item px-2">
            <Link to="/" className="nav-link" style={{outline: "none"}} >
              Workout Log
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/create" className="nav-link" style={{outline: "none"}}>
              New Workout
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/user" className="nav-link" style={{outline: "none"}}>
              New User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
