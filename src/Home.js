import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Person, lookupProfile,
} from 'blockstack';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1>Hi</h1>
    )
  }
}