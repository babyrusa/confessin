import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';
import Nav from './Nav.js';
import {Route, Switch } from "react-router-dom";
import Home from './Home.js';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="">
        <div className="">
          {!userSession.isUserSignedIn() ?
            <Signin userSession={userSession} handleSignIn={this.handleSignIn} />
            :
            <React.Fragment>
              <Nav userSession={userSession} handleSignOut={this.handleSignOut} />
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} userSession={userSession} />} />
                <Route exact path="/:username" render={(props) => <Profile {...props} userSession={userSession} />} />
              </Switch>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData })
      });
    }
  }
}
