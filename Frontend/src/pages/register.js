import React, { Component } from "react";

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordagain: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firstname, lastname, email, password, passwordagain } = this.state;

    if (
      !firstname.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordagain.length
    )
      return;

    if (password !== passwordagain) return;

    //VERIFICACAO DA API AQUI
    //ADD um alert aqui

    //Depois do registro, joga pro login
    this.props.history.push("/login");
  };

  handleFNInputChange = e => {
    this.setState({ firstname: e.target.value });
  };
  handleLNInputChange = e => {
    this.setState({ lastname: e.target.value });
  };
  handleEInputChange = e => {
    this.setState({ email: e.target.value });
  };
  handlePWInputChange = e => {
    this.setState({ password: e.target.value });
  };
  handlePWAInputChange = e => {
    this.setState({ passwordagain: e.target.value });
  };

  render() {
    return (
      <div className="bg-dark">
        <div className="container">
          <div className="card card-register mx-auto mt-5">
            <div className="card-header">Register an Account</div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-label-group">
                        <input
                          value={this.state.firstname}
                          onCharge={this.handleFNInputChange}
                          placeholder="First Name"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-label-group">
                        <input
                          value={this.state.lastname}
                          onCharge={this.handleLNInputChange}
                          placeholder="Last Name"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <input
                      value={this.state.email}
                      onCharge={this.handleEInputChange}
                      placeholder="Email"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-label-group">
                        <input
                          value={this.state.password}
                          onCharge={this.handlePWInputChange}
                          placeholder="Password"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-label-group">
                        <input
                          value={this.state.password}
                          onCharge={this.handlePWAInputChange}
                          placeholder="Password again"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="Submit">Register</button>
              </form>
              <div className="text-center">
                <a className="d-block small mt-3" href="login.html">
                  Login Page
                </a>
                <a className="d-block small" href="forgot-password.html">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
