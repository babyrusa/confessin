import React, { Component } from "react";
import Profile from "./profile/Profile.js";
import Signin from "./Signin.js";
import { User, configure, getConfig } from "radiks";
import { UserSession, AppConfig, config } from "blockstack";
import Nav from "./nav/Nav.js";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home/Home.js";
import KonfessionFeed from "./home/KonfessionFeed.js";
import SingleKonfession from "./konfession/SingleKonfession.js";

config.logLevel = "none";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig: appConfig });

const apiServer =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://confessin-server.herokuapp.com";
configure({
  apiServer: apiServer,
  userSession
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession
    };
  }
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
          {/* {!userSession.isUserSignedIn() ? (
            <Signin
              userSession={userSession}
              handleSignIn={this.handleSignIn}
            />
          ) : ( */}
            <React.Fragment>
              <Nav
                userSession={userSession}
                handleSignOut={this.handleSignOut}
              />
              <Switch>
                <Route exact path="/" render={props => (<Home {...props} userSession={userSession} />)}/>
                <Route exact path="/signin" render={props => (<Signin {...props} userSession={userSession}  handleSignIn={ this.handleSignIn }/>)}/>
                <Route exact path="/profile" render={props => (<Profile {...props} handleSignOut={this.handleSignOut} userSession={userSession}/>)}/>
                <Route exact path="/hashtag/:hashtagKey" render={props => (<KonfessionFeed  {...props} userSession={userSession} />)}/>
                <Route exact path="/confession/:konfessionId" render={props => (<SingleKonfession  {...props} userSession={userSession} />)}/>
                <Route path="*"  render={() => <Redirect to ="/"/>}/>
              </Switch>
            </React.Fragment>
          {/* )} */}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    // if (userSession.isSignInPending()) {
    //   userSession.handlePendingSignIn().then((userData) => {
    //     window.history.replaceState({}, document.title, "/")
    //     this.setState({ userData: userData })
    //   });
    // }
    const { userSession } = this.state;
    if (userSession.isSignInPending()) {
      await userSession.handlePendingSignIn().then(() => {
        window.location = window.location.origin;
      });
    } else if (userSession.isUserSignedIn()) {
      // const userData = userSession.loadUserData();
      const currentUser = await User.createWithCurrentUser();
    }
  }
}
