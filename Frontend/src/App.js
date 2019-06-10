import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Charts from "./pages/charts";
import TableGUs from "./pages/tableGUs";
import GenerationInfo from "./pages/generationInfo";
import MicroGrids from "./pages/microgrids";
import Page404 from "./pages/page404";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/charts" component={Charts} />
          <Route path="/dashboard/generationunits" component={TableGUs} />
          <Route path="/dashboard/generationinfo" component={GenerationInfo} />
          <Route path="/dashboard/microgrids" component={MicroGrids} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}
