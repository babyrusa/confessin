import React, { Component } from "react";
import Konfession from "../models/Konfession";
import KonfessionReaction from "./KonfessionReaction";
import TimeStamp from "../shared/timestamp.js";
import KonfessionCommentSection from "./KonfessionCommentSection";
import KonfessionHashtag from "./KonfessionHashtag";
import KonfessionMoreButton from "./KonfessionMoreButton";
import { Dot } from "react-animated-dots";
import { Link } from "react-router-dom";

export default class SingleKonfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      editMode: false,
      konfession: {
        attrs: {
          _id: "",
          createdAt: "",
          text: "",
          username: "",
          anonymousIdentity: "",
          index: 0
        }
      },
      editedKonfession: ""
    };
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params.konfessionId) {
      this.fetchKonfessionById().finally(() => {
        this.setState({
          isLoading: false
        });
      });
    } else {
      this.setState({
        konfession: this.props.konfession,
        isLoading: false
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.konfession !== this.props.konfession) {
      this.setState({
        konfession: this.props.konfession
      });
    }
    if (
      this.props.match &&
      prevProps.match.params.konfessionId !==
        this.props.match.params.konfessionId
    ) {
      this.fetchKonfessionById().finally(() => {
        this.setState({
          isLoading: false
        });
      });
    }
  }
  async fetchKonfessionById() {
    let _konf = await Konfession.findById(
      this.props.match.params.konfessionId,
      { decrypt: this.props.userSession.isUserSignedIn() }
    );
    if (_konf) {
      this.setState({
        konfession: _konf
      });
    } else {
      this.props.history.push(`/`);
    }
  }
  editKonfession() {
    const { konfession } = this.state;

    this.setState({
      editedKonfession: konfession.attrs.text,
      editMode: true
    });
  }
  stopEditKonfession() {
    this.setState({
      editMode: false
    });
  }
  onEditKonfession(e) {
    this.setState({
      editedKonfession: e.target.value
    });
  }
  async saveEdittedKonfession() {
    const { konfession } = this.state;

    try {
      konfession.update({
        text: this.state.editedKonfession
      });
      await konfession.save();
      this.stopEditKonfession();
      // window.location.reload(false);
    } catch (e) {
      console.log(e);
      // alert("we apologize. unable to save, try again later");
    }
  }
  renderWithHashtags(){
    const { konfession } = this.state;

    const regex = /\#\w+\b/g;
    let text = konfession.attrs.text;
    let hashtags = text.match(regex);
    let parts = text.split(regex) // re is a matching regular expression
    let toReturn = JSON.parse(JSON.stringify(parts));
    for (let i = 0; i < (parts.length-1); i++) {
      console.log(hashtags[i])
      toReturn.splice(i+1,0,<Link to={'/hashtag/' + hashtags[i].replace("#",'')}>{hashtags[i]}</Link>)
      // parts[i] = <Link to={'/hashtag/' + hashtags[i].replace("#",'')}>{hashtags[i]}</Link>
    }
    return toReturn;
  }
  render() {
    const { konfession } = this.state;
    const length = konfession.attrs.text.length;

    return (
      <div className="singlekonfession-wrapper">
        {this.state.isLoading ? (
          <div>
            {/* style={{fontFamily : "serif"}} */}
            loading
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </div>
        ) : this.state.konfession.attrs._id === "" ? (
          <div>
            There is network connection error. Please check your internet. 📶❌
          </div>
        ) : (
          <div className="singlekonfession">
            <KonfessionMoreButton
              deleteSketch={this.props.deleteSketch}
              konfession={this.state.konfession}
              userSession={this.props.userSession}
              fetchKonfessions={this.props.fetchKonfessions}
              editKonfession={this.editKonfession.bind(this)}
            />
            <span className="confession-index">
              {konfession.attrs.index}
              &#46;
            </span>
            <div className="confession-top">
              <small style={{ padding: "5px" }}>
                {TimeStamp.convertDate(
                  konfession.attrs.createdAt
                ).toUpperCase()}
              </small>

              <small style={{ padding: "5px" }}>
                {this.state.konfession.attrs.updatedAt !==
                this.state.konfession.attrs.createdAt
                  ? "Edited"
                  : ""}
              </small>
            </div>
            <div className="confession-body">
              {!this.state.editMode ? (
                <div>
                  <i className="fas fa-quote-left"></i>
                  <h3
                    style={{
                      fontSize: length > 150 ? "15px" : "20px",
                      fontWeight: "bold"
                    }}
                  >
                    {/* {konfession.attrs.text} */}
                    {this.renderWithHashtags()}
                  </h3>
                  <i className="fas fa-quote-right"></i>
                </div>
              ) : (
                <div>
                  <textarea
                    maxLength="63206"
                    rows="5"
                    className="form-control editKonfession"
                    value={this.state.editedKonfession}
                    onChange={this.onEditKonfession.bind(this)}
                  ></textarea>
                  <button
                    className="btn btn-primary"
                    onClick={this.saveEdittedKonfession.bind(this)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.stopEditKonfession.bind(this)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {/* <KonfessionHashtag
                konfession={this.state.konfession}
                userSession={this.props.userSession}
              /> */}
              <KonfessionReaction
                konfession={this.state.konfession}
                userSession={this.props.userSession}
                openModal={this.props.openModal}
              />
            </div>

            <KonfessionCommentSection
              konfession={this.state.konfession}
              userSession={this.props.userSession}
            />
          </div>
        )}
      </div>
    );
  }
}
