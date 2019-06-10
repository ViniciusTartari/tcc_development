import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="wrapper">
          <div className="container-fluid">
            <h1>Welcome!</h1>
            <h4>
              Go to <Link to="/login">Login</Link>
            </h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
