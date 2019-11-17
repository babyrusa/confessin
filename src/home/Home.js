import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Person, lookupProfile,
} from 'blockstack';
import NewKonfession from './NewKonfession.js'
import KonfessionFeed from './KonfessionFeed.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <React.Fragment>
      <div className="row">
        <div className="col-6 mx-auto">
        <NewKonfession userSession = {this.props.userSession} />
        <KonfessionFeed userSession = {this.props.userSession} />

      </div>
      </div >
      // </React.Fragment>
    )
  }
}