import React, { Component } from "react";

export default class chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartTitle: this.props.chartTitle,
      chartLastUpdated: this.props.chartLastUpdated
    };
  }

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fas fa-chart-area" />
            {this.state.chartTitle}
          </div>
          <div className="card-body">
            <canvas id="myAreaChart" width="100%" height="30" />
          </div>
          <div className="card-footer small text-muted">
            Last update: {this.state.chartLastUpdated}
          </div>
        </div>
      </div>
    );
  }
}
