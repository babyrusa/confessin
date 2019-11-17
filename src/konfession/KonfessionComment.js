import React, { Component } from "react";

export default class KonfessionComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <div id="konfession-comment">
      <input type="text" class="form-control" placeholder="Drop your thoughts..."/>
      </div>
    )
  }
}