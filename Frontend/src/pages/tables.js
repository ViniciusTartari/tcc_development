import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class Tables extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Tables</li>
              </ol>
            </div>

            <Table
              tableTitle="Table titlee"
              //Add os dados...
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
