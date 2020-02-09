import React, { Component } from "react";
import Konfession from "../models/Konfession";
import TimeStamp from "../shared/timestamp.js";
import { Dot } from "react-animated-dots";
import KonfessionHashtag from "../konfession/KonfessionHashtag";
import KonfessionReaction from "../konfession/KonfessionReaction";

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
        <span className="confession-index">
          {konfession.attrs.index}
          &#46;
        </span>
        <div className="confession-top">
          <small style={{ padding: "5px" }}>
            {TimeStamp.convertDate(konfession.attrs.createdAt).toLowerCase()}
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
              <h3 style={{fontSize : length > 150 ? "15px" : "20px", fontWeight : "bold"}}>{konfession.attrs.text}</h3>
              <i className="fas fa-quote-right"></i>
            </div>
          ) : (
            <div>
              {/* <textarea
            maxLength="63206"
            rows="5"
            className="form-control editKonfession"
            value={this.state.editedKonfession}
            onChange={this.onEditKonfession.bind(this)}
          ></textarea> */}
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
          <KonfessionHashtag
            konfession={konfession}
            userSession={this.props.userSession}
          />
          <KonfessionReaction 
            konfession={konfession}
            userSession={this.props.userSession}
            // openModal={this.props.openModal}
          />
        </div>
      </div>
    );
  }
}
