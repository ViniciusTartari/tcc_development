import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class GenerationInfo extends Component {
  constructor() {
    super();
    this.state = {
      SINrequest: {},
      generation: [],
      microgrids: [],
      generationunits: []
    };
  }

  componentDidMount() {
    this.getRequest();
    this.getGenerationUnits();
  }

  getRequest = async () => {
    await api.get("sinrequest").then(response => {
      this.setState({
        SINrequest: {
          id: response.data[0]._id,
          addedAt: response.data[0].sr_addedAt,
          bodyRequest: response.data[0].sr_bodyRequest
        }
      });
      console.log(this.state.SINrequest);
    });
  };

  getGenerationUnits = async () => {
    await api.get("generationunit").then(response => {
      this.setState({ generationunits: response.data });
      console.log(this.state.generationunits);
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Geração atual</li>
              </ol>

              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-info-circle" /> Informações
                </div>
                <div className="card-body">
                  <h3 className="text-center">
                    Requisição ativa: {this.state.SINrequest.id}
                  </h3>
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="text-center">
                        Requisição recebida em:{" "}
                        {Date(this.state.SINrequest.addedAt)}
                      </h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="text-center">
                        Horário de ação: {Date(Date.now()).toString()}
                      </h5>
                    </div>
                  </div>
                  <br />
                  <h5 className="text-center">
                    Percentual produzido, por toda a rede, para demanda atual:
                  </h5>
                  <h3 className="text-center">10%</h3>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-balance-scale" /> Ponderação de carga
                </div>
                <div className="card-body">
                  <h3 className="text-center">Por Microrrede</h3>
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
                          <th>Potência Atual</th>
                          <th>Potência Máxima</th>
                          <th>Percentual da Requisição</th>
                          <th>Potêncial gerado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.microgrids.map(data => {
                          return (
                            <tr>
                              <td>{data.mg_name}</td>
                              <td>{data.mg_power}</td>
                              <td>{data.mg_maxPower}</td>
                              <td>{data.mg_percentual}</td>
                              <td>{data.mg_generated}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <h3 className="text-center">Por Unidade Geradora</h3>
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
                          <th>Sensor</th>
                          <th>Potência Atual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.generationunits.map(data => {
                          return (
                            <tr>
                              <td>{data.gu_name}</td>
                              <td>{data.gu_model}</td>
                              <td>{data.gu_microgrid}</td>
                              <td>{data.gu_type}</td>
                              <td>{data.gu_maxPower}</td>
                              <td>{data.gu_meter}</td>
                              <td>Calculado</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

// <p className="lead">
//   Page not found.
//   <Link to="/home">Return to home</Link>
// </p>
