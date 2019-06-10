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
    this.getMicrogrids();
    this.getGenerationUnits();
  }

  getRequest = async () => {
    await api.get("sinrequest").then(response => {
      this.setState({
        SINrequest: {
          id: response.data[0]._id,
          addedAt: response.data[0].sr_addedAt
        }
      });
    });
  };

  getGenerationUnits = async () => {
    await api.get("generationunit/active/true").then(response => {
      this.setState({ generationunits: response.data });
      console.log(this.state.generationunits);
    });
  };

  getMicrogrids = async () => {
    await api.get("microgrid").then(response => {
      this.setState({ microgrids: response.data });
      console.log(this.state.microgrids);
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

                  <h5 className="text-center">
                    Requisição recebida em: {this.state.SINrequest.addedAt}
                  </h5>
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
                          <th>Unidade Geradoras</th>
                          <th>Potência Atual</th>
                          <th>Potência Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.microgrids.map(data => {
                          return (
                            <tr>
                              <td>{data._id}</td>
                              <td>{data.qntGU}</td>
                              <td>{data.actualPower}</td>
                              <td>{data.totalPower}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <h3 className="text-center">Unidades Geradoras Ativas</h3>
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
                              <td>{data.gu_generating}</td>
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
