import React, { Component } from "react";
import Reaction from "../models/Reaction";
import { User } from "radiks/lib";
import Comment from "../models/Comment";

export default class KonfessionCardReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virtueCount: 0,
      sinCount: 0,
      deadlySinCount: 0,
      commentCount: 0,
      selfReaction: {
        attrs: {
          _id: "",
          type: "",
          username: ""
        },
      },
      selfReactionType : ""
    };
  }
  componentDidMount() {
    this.fetchReactions();
    this.fetchCommentCount();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.konfession !== this.props.konfession) {
      this.fetchReactions();
      this.fetchCommentCount();
    }
  }
  async fetchReactions() {
    let _reactions = await Reaction.fetchList(
      { konfessionId: this.props.konfession.attrs._id },
      { decrypt: this.props.userSession.isUserSignedIn() }
    );
    let _virtueCount = 0,
      _sinCount = 0,
      _deadlySinCount = 0;
    // console.log(_reactions)
    for (let i = 0; i < _reactions.length; i++) {
      if (_reactions[i].attrs.type === "virtue") {
        _virtueCount += 1;
      } else if (_reactions[i].attrs.type === "sin") {
        _sinCount += 1;
      } else if (_reactions[i].attrs.type === "deadly sin") {
        _deadlySinCount += 1;
      }
      this.getSelfReaction(_reactions[i]);
    }
    this.setState({
      virtueCount: _virtueCount,
      sinCount: _sinCount,
      deadlySinCount: _deadlySinCount
    });
  }
  getSelfReaction(reaction) {
    if (
      this.props.userSession.isUserSignedIn() &&
      reaction.attrs.username === this.props.userSession.loadUserData().username
    ) {
      this.setState({
        selfReaction: reaction
      });
    } else {
      this.resetSelfReaction();
    }
    // console.log(this.state.selfReaction.attrs.type)
  }
  resetSelfReaction() {
    this.setState({
      selfReaction: {
        attrs: {
          _id: "",
          type: "",
          username: ""
        }
      },
      selfReactionType : ""
    });
  }
  
  async fetchCommentCount(){
    try {
      let _commentCount = await Comment.count(
        {
          konfessionId: this.props.konfession.attrs._id,
        },
        { decrypt: this.props.userSession.isUserSignedIn()  }
      );
      this.setState({
        commentCount: _commentCount
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="konfession-reaction-wrapper ikonfess">
          <div className="konfession-reaction">
            <div className="reaction-count">{this.state.virtueCount}</div>
            <button
              className={
                "btn-primary btn-reaction-card " +
                (this.state.selfReaction.attrs.type === "virtue"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              data-placement="bottom"
              title="Virtue"
            >
              👼
            </button>
          </div>
          <div className="konfession-reaction">
            <div className="reaction-count">{this.state.sinCount}</div>
            <button
              className={
                "btn-primary btn-reaction-card " +
                (this.state.selfReaction.attrs.type === "sin"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              data-placement="bottom"
              title="Sin"
            >
              😈
            </button>
          </div>
          <div className="konfession-reaction">
            <div className="reaction-count">{this.state.deadlySinCount}</div>
            <button
              className={
                "btn-primary btn-reaction-card " +
                (this.state.selfReaction.attrs.type === "deadly sin"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              data-placement="bottom"
              title="Deadly Sin"
            >
              💀
            </button>
          </div>
          <div className="konfession-reaction">
            <div className="reaction-count">{this.state.commentCount}</div>
            <button
              className={
                "btn-primary btn-reaction-card "
              }
              data-toggle="tooltip"
              data-placement="bottom"
              title="Comments"
            >
              💬
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
