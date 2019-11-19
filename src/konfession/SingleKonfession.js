import React, { Component } from "react";
import Konfession from "../models/Konfession";
import KonfessionReaction from "./KonfessionReaction";
import KonfessionComment from "./KonfessionComment";
import TimeStamp from './timestamp.js';
import KonfessionCommentSection from "./KonfessionCommentSection";

export default class SingleKonfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  /**
   * helper to check if user is viewing their own sketch
   */
  isLocal() {
    const { userSession } = this.props
    if (userSession.isUserSignedIn()) {
      // return userSession.loadUserData().username === this.state.sketch.attrs.username
    }
    return false;
  }
  render(){
    return(
      <div id="singlekonfession">
      <div>
      <p>Confession {this.props.konfession.attrs.index}</p>
      <small>{TimeStamp.convertDate(this.props.konfession.attrs.createdAt).toLowerCase()}</small>
      <i className="fas fa-quote-left"></i>
      <h1>{this.props.konfession.attrs.text}</h1>
      <i className="fas fa-quote-right"></i>      
      </div>
      <KonfessionReaction konfession = {this.props.konfession}/>
      <KonfessionCommentSection konfession = {this.props.konfession}/>
      </div>
    )
  }
}