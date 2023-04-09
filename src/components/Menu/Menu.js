import React from "react";
import { NavLink } from "react-router-dom";
const Menu = () => {
  const activeClass = {
    color: "red",
    backgroundColor: "blue",
    fontWeight: 700,
  };

  return (
    <div className="menu_container">
      <NavLink
        to="/list"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        className="menu_link"
      >
        Список
      </NavLink>
      <NavLink
        to="/settings"
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        className="menu_link"
      >
        Настройки
      </NavLink>
    </div>
  );
};

export default Menu;
