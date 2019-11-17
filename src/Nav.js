import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Person, lookupProfile,
} from 'blockstack';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }


  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
        <Link to="/" className="navbar-brand navbar-brand-margin">
          iKonfess
          {/* <img src="/images/Dcasso-word-white-border.png" className="logo-frame" width="100" height="100" alt="Dcasso logo" /> */}
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {userSession.isUserSignedIn() &&
              <React.Fragment>
                <Link to={"/profile"} className="nav-item btn btn-lg btn-primary" id="profile-feed">Profile</Link>
                {/* <Link to={"/contact-us"} className="nav-item btn nav-showonphoneonly" id="profile-feed">Contact Us</Link> */}

                <button
                  className="nav-item btn btn-lg btn-primary nav-showonphoneonly"
                  id="signout-button"
                  onClick={handleSignOut.bind(this)}
                >
                  Logout
                </button>
            <div className="btn-group">
            <button type="button" className="btn dropdown-toggle nav-more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              More
            </button>
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" href="#"><i className="fas fa-user text-primary"></i>&nbsp;Profile</Link>
              <Link to="/contact-us" className="dropdown-item" ><i className="fas fa-envelope text-primary"></i>&nbsp;Contact Us</Link>
              <Link to="/about-dcasso"><small className="dropdown-item">About Dcasso</small></Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" id="signout-button"
                  onClick={handleSignOut.bind(this)} role="button"><i className="fas fa-sign-out-alt text-primary"></i>&nbsp;Log Out</a>
            </div>
          </div>
              </React.Fragment>}
            {!userSession.isUserSignedIn() &&
              <Link to="/signin"><button
                className="nav-item btn btn-lg"
                id="signout-button"
              >
                Log In
          </button></Link>}
          </div>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    const { userSession } = this.props;
    if (userSession.isUserSignedIn()) {
      this.setState({
        person: new Person(userSession.loadUserData().profile),
      });
    }
  }
}