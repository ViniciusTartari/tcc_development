import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class GenerationInfo extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div id="wrapper">
          <Sidebar />
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
                <h3 className="text-center">Requisição ativa: 12345678</h3>
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-center">Hora atual:{Date.now()}</h5>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-center">
                      Horário de ação: {Date.now()}
                    </h5>
                  </div>
                </div>

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
                  </table>
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
