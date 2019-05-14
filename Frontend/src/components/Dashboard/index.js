import React, { Component } from "react";

import { Link } from "react-router-dom";

import Chart from "./chart";
import Table from "./table";

export default class Dashboard extends Component {
  render() {
    return (
      <div id="content-wrapper">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Overview</li>
          </ol>

          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-comments" />
                  </div>
                  <div className="mr-5">Card_1-Title</div>
                </div>
                <Link
                  to="/"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">Card_2-Title</div>
                </div>
                <Link
                  to="/"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-shopping-cart" />
                  </div>
                  <div className="mr-5">Card_3-Title</div>
                </div>
                <Link
                  to="/"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-life-ring" />
                  </div>
                  <div className="mr-5">Card_4-Title</div>
                </div>
                <Link
                  to="/"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <Chart
            chartTitle="Area chart title"
            chartLastUpdated={Date.now()}
            //PASSAR OS DADOS
          />

          <Table
            tableTitle="Table title"
            //PASSAR OS DADOS
          />
        </div>
      </div>
    );
  }
}
