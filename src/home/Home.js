import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Person, lookupProfile } from "blockstack";
import NewKonfession from "./NewKonfession.js";
import KonfessionFeed from "./KonfessionFeed.js";
import SignInNoticeModal from "../shared/SignInNoticeModal.js";
import Distance from "../shared/distance.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen : false
    }
  }
  componentDidMount() {
    const { userSession } = this.props;

    if (!userSession.isUserSignedIn()){
      setTimeout(() => {
        this.openModal()
      }, 5000);
    }
  }
  openModal(){
    this.setState({modalIsOpen: true});	
  }
  closeModal(){
    this.setState({modalIsOpen: false});	
  }
  
  render() {
    return (
      <React.Fragment>
        <KonfessionFeed 
        userSession={this.props.userSession} 
        openModal = {this.openModal.bind(this)}/>
        <SignInNoticeModal
        modalIsOpen={this.state.modalIsOpen}
        closeModal = {this.closeModal.bind(this)}	      
        />
    </React.Fragment>
    );
  }
}
