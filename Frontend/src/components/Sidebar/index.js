import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span> Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/generationinfo" className="nav-link">
            <i className="fas fa-fw fa-bolt" />
            <span>Geração atual</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/charts" className="nav-link">
            <i className="fas fa-fw fa-chart-area" />
            <span> Gráficos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/microgrids" className="nav-link">
            <i className="fas fa-fw fa-network-wired" />
            <span> Microrredes</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/generationunits" className="nav-link">
            <i className="fas fa-fw fa-table" />
            <span> Unidades Geradoras</span>
          </Link>
        </li>
      </ul>
    );
  }
}
