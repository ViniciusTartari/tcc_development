import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Axios from "axios";

export default class Tables extends Component {
  constructor() {
    super();
    this.state = {
      tableData: []
    };
  }

  componentWillMount() {
    this.getTableData();
  }

  async getTableData() {
    await Axios.get("http://localhost:3000/api/generationunit")
      .then(response => {
        this.setState({ tableData: response.data }, () => {
          console.log(this.state);
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
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Microrredes</li>
              </ol>
              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-table" /> Microrredes
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
                          <th>Unidades Geradoras</th>
                          <th>Potência Máxima</th>
                          <th>Ativa</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Unidades Geradoras</th>
                          <th>Potência Máxima</th>
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
                <div className="card-footer small text-muted">Updated ...</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
