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
      <div>
        <button className="btn">
          Virtue
          👼🏻
        </button>
        <button className="btn ">
          Sin
          😈
        </button>
        <button className="btn ">
          Deadly Sin
          💀
        </button>
      </div>
      </React.Fragment>
    )
  }
}