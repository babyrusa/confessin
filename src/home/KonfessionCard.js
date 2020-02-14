import React, { Component } from "react";
import Konfession from "../models/Konfession";
import TimeStamp from "../shared/timestamp.js";
import { Dot } from "react-animated-dots";
import KonfessionHashtag from "../konfession/KonfessionHashtag";
import { Link, withRouter } from "react-router-dom";
import KonfessionCardReaction from "./KonfessionCardReaction";

class KonfessionCard extends Component {
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
  onGoToPost(){
    const { konfession } = this.props;
    this.props.history.push(`/c/${konfession.attrs._id}`);
  }
  renderWithHashtags(){
    const { konfession } = this.props;

    const regex = /\#\w+\b/g;
    let text = konfession.attrs.text;
    let hashtags = text.match(regex);
    let parts = text.split(regex) // re is a matching regular expression
    let toReturn = JSON.parse(JSON.stringify(parts));
    for (let i = 0; i < (parts.length-1); i++) {
        toReturn.splice(i+1,0,<Link to={'/hashtag/' + hashtags[i].replace("#",'')}
      className="hashtag">{hashtags[i]}</Link>)
      // parts[i] = <Link to={'/hashtag/' + hashtags[i].replace("#",'')}>{hashtags[i]}</Link>
    }
    return toReturn;
  }
  render() {
    const { konfession } = this.props;
    const length = konfession.attrs.text.length;
    return (
      <div className="confession-card">
        {/* <Link to={`/c/${konfession.attrs._id}`} className="confession-card"> */}
        <span className="confession-index">
          {konfession.attrs.index}
          &#46;
        </span>
        <div className="confession-top">
          <small style={{ padding: "5px" }}>
            {TimeStamp.convertDate(konfession.attrs.createdAt).toUpperCase()}
          </small>

          <small style={{ padding: "5px" }}>
            {konfession.attrs.updatedAt !== konfession.attrs.createdAt
              ? "Edited"
              : ""}
          </small>
        </div>
        <Link to={`/c/${konfession.attrs._id}`} className="confession-body">
        {/* <div className="confession-body" onClick={this.onGoToPost.bind(this)}> */}
          <div>
            <i className="fas fa-quote-left"></i>
            <h3
              style={{
                fontSize: length > 150 ? "15px" : "20px",
                fontWeight: "bold"
              }}
            >
              {this.renderWithHashtags()}

            </h3>
            <i className="fas fa-quote-right"></i>
          </div>
        {/* </div> */}
        </Link>
        <div className="confession-bottom">
        <KonfessionCardReaction
            konfession={konfession}
            userSession={this.props.userSession}
            // openModal={this.props.openModal}
          />
        </div>
        {/* </Link> */}
      </div>
    );
  }
}
export default withRouter(KonfessionCard);
