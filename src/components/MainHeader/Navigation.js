import React from "react";

import classes from "./Navigation.module.css";
import { useAuthContextValues } from "../../context/auth-context";

const Navigation = () => {
  const { isLoggedIn, handleLogout } = useAuthContextValues();
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
