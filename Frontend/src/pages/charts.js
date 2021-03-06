import React, { Component } from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Line, Pie, Bar } from "react-chartjs-2";

export default class charts extends Component {
  constructor() {
    super();
    this.state = {
      chartData1: {},
      chartData2: {},
      chartData3: {},
      chartData4: {},
      updatedAt: ""
    };
  }

  componentWillMount() {
    this.getChart1Data();
    this.getChart2Data();
    this.getChart3Data();
    this.getChart4Data();
  }

  async getChart1Data() {
    await api.get("sinrequest").then(response => {
      this.setState({
        chartData1: {
          labels: response.data[0].sr_bodyRequest.map(req => req.horario),
          datasets: [
            {
              label: "Power",
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

  async getChart2Data() {
    await api.get("generationunit").then(response => {
      let solar = 0,
        wind = 0,
        pch = 0;

      response.data.map(el => {
        if (el.gu_type == "Solar") solar++;
        if (el.gu_type == "PCH") pch++;
        if (el.gu_type == "Eólico") wind++;
      });

      this.setState({
        chartData2: {
          labels: ["Solar", "Eólico", "PCH"],
          datasets: [
            {
              label: "Power",
              data: [solar, wind, pch],
              borderWidth: 1,
              backgroundColor: ["yellow", "green", "blue"],
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
            }
          ]
        }
      });
    });
  }

  async getChart3Data() {
    await api.get("generationunit/available/true").then(response => {
      let solar = 0,
        wind = 0,
        pch = 0;

      response.data.map(el => {
        if (el.gu_type == "Solar") solar++;
        if (el.gu_type == "PCH") pch++;
        if (el.gu_type == "Eólico") wind++;
      });

      this.setState({
        chartData3: {
          labels: ["Solar", "Eólico", "PCH"],
          datasets: [
            {
              label: "Power",
              data: [solar, wind, pch],
              borderWidth: 1,
              backgroundColor: ["yellow", "green", "blue"],
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
            }
          ]
        }
      });
    });
  }

  async getChart4Data() {
    await api.get("generationunit/active/true").then(response => {
      console.log(response);
      let solar = 0,
        wind = 0,
        pch = 0;

      response.data.map(el => {
        if (el.gu_type == "Solar") solar++;
        if (el.gu_type == "PCH") pch++;
        if (el.gu_type == "Eólico") wind++;
      });

      this.setState({
        chartData4: {
          labels: ["Solar", "Eólico", "PCH"],
          datasets: [
            {
              label: "Power",
              data: [solar, wind, pch],
              borderWidth: 1,
              backgroundColor: ["yellow", "green", "blue"],
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
            }
          ]
        }
      });
    });
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
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Gráficos</li>
              </ol>

              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-chart-area" /> Demanda de geração
                </div>
                <div className="card-body">
                  <Line
                    height={120}
                    data={this.state.chartData1}
                    options={{
                      legend: {
                        labels: {
                          fontColor: "#212529"
                        }
                      }
                    }}
                  />
                </div>
                <div className="card-footer small text-muted">
                  Atualizado em {this.state.updatedAt}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-3">
                    <div className="card-header">
                      <i className="fas fa-chart-pie" /> Geradores - Cadastrados
                    </div>
                    <div className="card-body">
                      <Pie
                        height={300}
                        data={this.state.chartData2}
                        options={{
                          legend: {
                            labels: {
                              fontColor: "#212529"
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="card-footer small text-muted">
                      Atualizado em {this.state.updatedAt}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-3">
                    <div className="card-header">
                      <i className="fas fa-chart-pie" /> Geradores - Disponiveis
                    </div>
                    <div className="card-body">
                      <Pie
                        height={300}
                        data={this.state.chartData3}
                        options={{
                          legend: {
                            labels: {
                              fontColor: "#212529"
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="card-footer small text-muted">
                      Atualizado em {this.state.updatedAt}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card mb-3">
                    <div className="card-header">
                      <i className="fas fa-chart-pie" /> Geradores - Ativos
                    </div>
                    <div className="card-body">
                      <Pie
                        height={300}
                        data={this.state.chartData4}
                        options={{
                          legend: {
                            labels: {
                              fontColor: "#212529"
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="card-footer small text-muted">
                      Atualizado em {this.state.updatedAt}
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
