import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email.length || !password.length) return;

    //VERIFICACAO DA API AQUI

    //localStorage.setItem("TCCProject:email", email);

    this.props.history.push("/dashboard");
  };

  handleInputChange = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.email}
            onCharge={this.handleInputChange}
            placeholder="Email"
          />
          <input
            value={this.state.password}
            onCharge={this.handleInputChange}
            placeholder="Password"
          />
          <button type="Submit">Login</button>
        </form>
      </div>
    );
  }
}
