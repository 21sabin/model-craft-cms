import React from "react";
import Header from "../../common/header/header.component";
import "./dashboard.component.style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateEvent from "../../components/create-event/create-event.component";

const routes = [
  {
    path: "/dashboard/event",
    sidebar: () => <CreateEvent />,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/dashboard/services",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

export default function Dashboard() {
  return (
    <div className="wrapper">
      <Router>
        <div className="sidebar">
          <ul
            style={{ listStyleType: "none", padding: 0 }}
            className="sidebar-list"
          >
            <li className="sidebar-list_item">
              <Link to="/dashboard/event" className="sidebar-list_item_link">
                Create Event
              </Link>
            </li>
            <li className="sidebar-list_item">
              <Link to="/dashboard/service" className="sidebar-list_item_link">
                Create Services
              </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Header />
          <h1>Admin Dashboard</h1>
          {/* <img
            src={
              "home/novelty/programming/Freelancingproject/Ecommerce-fintech-company/server/assests/images/event/1574436662796_1504263774_9688244f7fa8d284ebe64d2ed3b8d064--anonymous-mask-lancaster.jpg"
            }
            style={{ width: 400, height: 400 }}
          /> */}
          <div className="sidebar_content">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.sidebar />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
