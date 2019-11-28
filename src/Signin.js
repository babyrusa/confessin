import React, { Component } from "react";

export default class Signin extends Component {
  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-10 mx-auto">
          <div
            className="row align-items-center"
            style={{
              height: "50vh",
              backgroundColor: "white",
              boxShadow: "0 0 10px #ff66b6"
            }}
          >
            <div className="col-sm-12 col-md-6">
              <img
                className=""
                src="images/online_discussion.svg"
                width="300"
              ></img>
            </div>
            <div className="col-sm-12 col-md-6" style={{textAlign : 'left'}}>
              <p className="lead">
                A Confession site where your identity is actually private.
                Feel free to open up your soul or spill any tea 😈. Be kind to each other.
              </p>

                <button
                  className="btn btn-primary btn-lg"
                  id="signin-button"
                  onClick={handleSignIn.bind(this)}
                >
                  Sign In with Blockstack
                </button>
                <br/>
                <small>*Our application is based on Blockstack infrastructure which
                   protect your data (we don't sell your data like Facebook 🤥)</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
