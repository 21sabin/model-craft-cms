import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Authentication/login.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
