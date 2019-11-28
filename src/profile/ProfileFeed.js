import React, { Component } from "react";
import Konfession from "../models/Konfession";
import SingleKonfession from "../konfession/SingleKonfession";
import { withRouter } from "react-router";

class ProfileFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allKonfessions: []
    };
  }
  componentDidMount() {
    if (!this.props.userSession.isUserSignedIn()) {
      this.props.history.push('/signin');
    }

    this.fetchSelfKonfessions().finally(() => {
      this.setState({ isLoading: false });
    });
  }

  /**
   * fetch all confessions at load
   */
  async fetchSelfKonfessions() {
    try {
      const _allKonfessions = await Konfession.fetchOwnList(
        {
          sort: "-createdAt"
        }
      );
      await this.setState({
        allKonfessions: _allKonfessions
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <React.Fragment>
      {!this.state.isLoading && this.state.allKonfessions.length !== 0 ? (
        <div>
          {this.state.allKonfessions.map(konfession => {
            return (
              <SingleKonfession
                key={konfession.attrs._id}
                konfession={konfession}
                userSession={this.props.userSession}
                fetchKonfessions={this.fetchSelfKonfessions.bind(this)}
              />
            );
          })}
          <div style={{ width: "100%" }}></div>
        </div>
      ) : !this.state.isLoading ? (
        <div>
          {" "}
          <p>No Sketches to display</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
      </React.Fragment>
    )
  }
}
export default withRouter(ProfileFeed)
