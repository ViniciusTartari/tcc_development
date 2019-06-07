import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
//import socket from "socket.io-client";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      tableData: [],
      updatedAt: ""
    };
  }

  componentWillMount = () => {
    this.getChartData();
    this.getTableData();
  };

  async getChartData() {
    await api.get("sinrequest").then(response => {
      console.log(response);

      this.setState({
        chartData: {
          labels: response.data[0].sr_bodyRequest.map(req => req.horario),
          datasets: [
            {
              label: "Potência",
              data: response.data[0].sr_bodyRequest.map(req => req.potencia),
              backgroundColor: "#007bff",
              borderWidth: 1,
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
            }
          ]
        },
        updatedAt: response.data[0].sr_addedAt
      });
    });
  }

  async getTableData() {
    await api
      .get("generationunit")
      .then(response => {
        this.setState({ tableData: response.data }, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

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
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Resumo</li>
              </ol>

              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-comments" />
                      </div>
                      <div className="mr-5">Unidades Geradoras</div>
                    </div>
                    <Link
                      to="/dashboard/generationunits"
                      className="card-footer text-white clearfix small z-1"
                    >
                      <span className="float-left">Ver detalhes</span>
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
                      <div className="mr-5">Demanda</div>
                    </div>
                    <Link
                      to="/dashboard/charts"
                      className="card-footer text-white clearfix small z-1"
                    >
                      <span className="float-left">Ver detalhes</span>
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
                      <div className="mr-5">Microrredes</div>
                    </div>
                    <Link
                      to="/dashboard/charts"
                      className="card-footer text-white clearfix small z-1"
                    >
                      <span className="float-left">Ver detalhes</span>
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
                      <div className="mr-5">Geração</div>
                    </div>
                    <Link
                      to="/dashboard/charts"
                      className="card-footer text-white clearfix small z-1"
                    >
                      <span className="float-left">Ver detalhes</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-chart-area" /> Area Chart Example
                </div>
                <div className="card-body">
                  <Line
                    height={100}
                    data={this.state.chartData}
                    options={{
                      legend: {
                        labels: {
                          fontColor: "#777"
                        }
                      }
                    }}
                  />
                </div>
                <div className="card-footer small text-muted">
                  Updated in {this.state.updatedAt}
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-table" /> Unidades Geradoras
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Modelo</th>
                          <th>Microrrede</th>
                          <th>Tipo</th>
                          <th>Potência Máxima</th>
                          <th>Disponível</th>
                          <th>Ativa</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Modelo</th>
                          <th>Microrrede</th>
                          <th>Tipo</th>
                          <th>Potência Máxima</th>
                          <th>Disponível</th>
                          <th>Ativa</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {this.state.tableData.map(data => {
                          return (
                            <tr>
                              <td>{data.gu_name}</td>
                              <td>{data.gu_model}</td>
                              <td>{data.gu_microgrid}</td>
                              <td>{data.gu_type}</td>
                              <td>{data.gu_maxPower}</td>
                              <td>{JSON.stringify(data.gu_available)}</td>
                              <td>{JSON.stringify(data.gu_active)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  Updated in {this.state.updatedAt}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
