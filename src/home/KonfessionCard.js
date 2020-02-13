import React, { Component } from "react";
import Konfession from "../models/Konfession";
import TimeStamp from "../shared/timestamp.js";
import { Dot } from "react-animated-dots";
import KonfessionHashtag from "../konfession/KonfessionHashtag";
import { Link } from "react-router-dom";
import KonfessionCardReaction from "./KonfessionCardReaction";

export default class KonfessionCard extends Component {
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
        <div className="confession-body">
          <Link to={`/c/${konfession.attrs._id}`}>
            <i className="fas fa-quote-left"></i>
            <h3
              style={{
                fontSize: length > 150 ? "15px" : "20px",
                fontWeight: "bold"
              }}
            >
              {konfession.attrs.text}
            </h3>
            <i className="fas fa-quote-right"></i>
          </Link>
          <KonfessionHashtag
            konfession={konfession}
            userSession={this.props.userSession}
          />
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
