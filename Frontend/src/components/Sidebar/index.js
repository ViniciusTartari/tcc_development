import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/charts" className="nav-link">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/tables" className="nav-link">
            <i className="fas fa-fw fa-table" />
            <span>Tables</span>
          </Link>
        </li>
      </ul>
    );
  }
}
