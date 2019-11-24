import React, { Component } from "react";
import Konfession from "../models/Konfession";
import SingleKonfession from "../konfession/SingleKonfession";
import Hashtag from "../models/Hashtag";
import NewKonfession from "./NewKonfession.js";

export default class KonfessionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allKonfessions: [],
      decrypt: true //default as true, decrypt=false when user not logged in
    };
  }

  componentDidMount() {
    // if (!this.props.userSession.isUserSignedIn()) {
    //   this.setState({
    //     decrypt: false
    //   });
    // }
    if (this.props.match && this.props.match.params.hashtagKey) {
      this.fetchKonfessionsByHashtag();
    } else {
      this.fetchKonfessions().finally(() => {
        this.setState({ isLoading: false });
      });
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.match && prevProps.match.params.hashtagKey !== this.props.match.params.hashtagKey ) {
      this.fetchKonfessionsByHashtag();
    }
  }
  /**
   * fetch all confessions at load
   */
  async fetchKonfessions() {
    try {
      const _allKonfessions = await Konfession.fetchList(
        {
          sort: "-createdAt"
        },
        { decrypt: this.props.userSession.isUserSignedIn() }
      );
      await this.setState({
        allKonfessions: _allKonfessions
      });
    } catch (e) {
      console.log(e);
    }
  }

  async fetchKonfessionsByHashtag() {
    const _konIds = await Hashtag.fetchList(
      { sort: "-createdAt", text: this.props.match.params.hashtagKey },
      { decrypt: this.props.userSession.isUserSignedIn() }
    );
    if (_konIds.length > 0) {
      let _allKonfessions = [];
      for (let i = 0; i < _konIds.length; i++) {
        const _konf = await Konfession.findById(_konIds[i].attrs.konfessionId, {
          decrypt: this.props.userSession.isUserSignedIn()
        });
        if (_konf) {
          await _allKonfessions.push(_konf);
        }
      }
      this.setState({
        allKonfessions: _allKonfessions,
        isLoading: false
      });
    } else {
      this.props.history.push(`/`);
    }
  }

  async getKonfessionById(konId) {
    const _konf = await Konfession.findById(konId, {
      decrypt: this.state.decrypt
    });
    return _konf;
  }

  render() {
    const { userSession } = this.props;

    return (
      // <React.Fragment>
        <div className="row">
          <div className="col-md-10 col-lg-10 col-xl-6 mx-auto">
            {userSession.isUserSignedIn() && (!this.props.match) && (
              <NewKonfession
                userSession={this.props.userSession}
                fetchKonfessions={this.fetchKonfessions.bind(this)}
              />
            )}
            {!this.state.isLoading && this.state.allKonfessions.length !== 0 ? (
              <div>
                {this.state.allKonfessions.map(konfession => {
                  return (
                    <SingleKonfession
                      key={konfession.attrs._id}
                      konfession={konfession}
                      userSession={this.props.userSession}
                      fetchKonfessions={this.fetchKonfessions.bind(this)}
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
          </div>
        </div>
      // </React.Fragment>
    );
  }
}
