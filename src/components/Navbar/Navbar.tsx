import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-success">
      <div className="container">
        <NavLink to="/" className="navbar-brand">Calorie tracker</NavLink>
      </div>
    </div>
  );
};

export default Navbar;