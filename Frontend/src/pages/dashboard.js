import React, { Component } from "react";
//import socket from "socket.io-client";

//import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import Index from "../components/Dashboard";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="wrapper">
          <Sidebar />
          <Index />
          <Footer />
        </div>
      </div>
    );
  }
}
