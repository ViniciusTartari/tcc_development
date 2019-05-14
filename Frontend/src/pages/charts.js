import React, { Component } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class charts extends Component {
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
                <li className="breadcrumb-item active">Charts</li>
              </ol>

              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-chart-area" />
                  Area Chart Example
                </div>
                <div className="card-body">
                  <canvas id="myAreaChart" width="100%" height="30" />
                </div>
                <div className="card-footer small text-muted">
                  Updated yesterday at 11:59 PM
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8">
                  <div className="card mb-3">
                    <div className="card-header">
                      <i className="fas fa-chart-bar" />
                      Bar Chart Example
                    </div>
                    <div className="card-body">
                      <canvas id="myBarChart" width="100%" height="50" />
                    </div>
                    <div className="card-footer small text-muted">
                      Updated yesterday at 11:59 PM
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-3">
                    <div className="card-header">
                      <i className="fas fa-chart-pie" />
                      Pie Chart Example
                    </div>
                    <div className="card-body">
                      <canvas id="myPieChart" width="100%" height="100" />
                    </div>
                    <div className="card-footer small text-muted">
                      Updated yesterday at 11:59 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
