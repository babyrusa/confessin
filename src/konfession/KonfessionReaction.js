import React, { Component } from "react";

export default class KonfessionReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <React.Fragment>
      <div className="konfession-reaction-wrapper">
        <div className="konfession-reaction">
          <div>
          Virtue
          </div>
        <button className="btn-primary btn-circle">
          😇
        </button>
        </div>
        <div className="konfession-reaction">
        <div>
          Sin
          </div>
        <button className="btn-primary btn-circle">
          😈
        </button>
        </div>
        <div className="konfession-reaction">
        <div>
          Deadly Sin
          </div>
        <button className="btn-primary btn-circle">
          💀
        </button>
        </div>
      </div>
      </React.Fragment>
    )
  }
}