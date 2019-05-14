import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class page404 extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="wrapper">
          <Sidebar />
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">404 Error</li>
            </ol>

            <h1 className="display-1">404</h1>
            <p className="lead">
              Page not found.
              <Link to="/home">Return to home</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
