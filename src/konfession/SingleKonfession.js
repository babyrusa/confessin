import React, { Component } from "react";
import Konfession from "../models/Konfession";
import KonfessionReaction from "./KonfessionReaction";
import KonfessionComment from "./KonfessionComment";

export default class SingleKonfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <div id="singlekonfession">
      <div>
      <p>Confession #{this.props.konfession.attrs.index}</p>
      <i class="fas fa-quote-left"></i>
      <h1>{this.props.konfession.attrs.text}</h1>
      <i class="fas fa-quote-right"></i>      
      </div>
      <KonfessionReaction/>
      <KonfessionComment/>
      </div>
    )
  }
}