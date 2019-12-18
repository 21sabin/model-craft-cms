import React from "react";
import Header from "../../common/header/header.component";
import "./dashboard.component.style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateEvent from "../../components/create-event/create-event.component";
import EventList from "../../components/Event-list/event-list.component";
import CreateEvents from "../../components/create-events/create-events.component";
import EditEvent from "../../components/edit-event/edit-event.component";
import Services from '../../components/services/services.component';

const routes = [
  {
    path: "/dashboard/event",
    sidebar: () => <CreateEvents />
  },
  {
    path: "/dashboard/event-list",
    sidebar: () => <EventList />
  },
  {
    path: "/dashboard/event/:id",
    sidebar: () => <EditEvent />
  },
  {
    path: "/dashboard/services/",
    sidebar: () => <Services />
  }
];

export default function Dashboard(props) {
  console.log("props", props);
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
              <Link
                to="/dashboard/event-list"
                className="sidebar-list_item_link"
              >
                Event List
              </Link>
            </li>

            <li className="sidebar-list_item">
              <Link to="/dashboard/services" className="sidebar-list_item_link">
                Create Services
              </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Header />
          <h1>Admin Dashboard</h1>
          {/* <img
            src={"http://localhost:5000/images/1574680459018_1504263774.jpg"}
            style={{ width: 400, height: 400 }}
            alt="image"
          /> */}
          <div className="sidebar_content">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={true}
                  children={<route.sidebar {...props} />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
