import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "Default Name App",
      username: "Default Username"
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="/">
          {this.state.appName}
        </a>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.username} - Logout
              <i className="fas fa-user-circle fa-fw" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
