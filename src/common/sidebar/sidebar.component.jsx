import React from "react";
import styled from "styled-components";
import "./sidebar.component.style.css";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <SIDEBAR>
      <div className="admin-profile"></div>
      <ul className="sidebar-option">
        <li className="sidebar-option_item">
          <NavLink
            to="/customer-list"
            style={{ padding: 20, textDecoration: "none", color: "white" }}
          >
            Customers
          </NavLink>
        </li>
        <li className="sidebar-option_item">
          <NavLink
            to="/add-product"
            style={{ margin: 20, textDecoration: "none", color: "white" }}
          >
            Add Product
          </NavLink>
        </li>
        <li className="sidebar-option_item">
          <NavLink
            to="/orders"
            style={{ paddingLeft: 20, textDecoration: "none", color: "white" }}
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </SIDEBAR>
  );
}

const SIDEBAR = styled.div`
  width: 320px;
  height: 100vh;
  background-color: #232ea6;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
  }
`;
