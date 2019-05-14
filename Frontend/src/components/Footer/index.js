import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="sticky-footer">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>
                Trabalho de conclusão de curso - Vinicius Tartari - Universidade
                Tecnológica Federal do Paraná - UTFPR
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
