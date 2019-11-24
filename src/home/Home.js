import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Person, lookupProfile } from "blockstack";
import NewKonfession from "./NewKonfession.js";
import KonfessionFeed from "./KonfessionFeed.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <KonfessionFeed userSession={this.props.userSession} />
    );
  }
}
