import React, { Component } from "react";
import Reaction from "../models/Reaction";
import { User } from "radiks/lib";

export default class KonfessionReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virtueCount: 0,
      sinCount: 0,
      deadlySinCount: 0,
      selfReaction: {
        attrs: {
          _id: "",
          type: "",
          username: ""
        }
      },
      decrypt: true //default as true, decrypt=false when user not logged in
    };
  }
  componentDidMount() {
    this.fetchReactions();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.konfession !== this.props.konfession) {
      this.fetchReactions();
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
    // console.log(reaction);
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
      }
    });
  }
  /**
   * main function that save reactions to DB
   * @param {*} reactionType
   */
  async saveReaction(reactionType) {
    const { userSession } = this.props;
    if (userSession.isUserSignedIn()) {
      if (this.state.selfReaction.attrs.type !== "") {
        console.log("have liked");
        if (reactionType !== this.state.selfReaction.attrs.type) {
          console.log("same type");

          this.state.selfReaction.update({
            type: reactionType
          });
          await this.state.selfReaction.save();
        } else {
          await this.state.selfReaction.destroy();
          this.resetSelfReaction();
        }
      } else {
        let _reaction = new Reaction({
          konfessionId: this.props.konfession.attrs._id,
          username: User.currentUser()._id,
          type: `${reactionType}`
        });
        await _reaction.save();
      }
      this.fetchReactions();
    } else {
      this.props.openModal();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="konfession-reaction-wrapper ikonfess">
          <div className="konfession-reaction">
            <div>{this.state.virtueCount}</div>
            <button
              className={
                "btn-primary btn-reaction btn-circle " +
                (this.state.selfReaction.attrs.type === "virtue"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              title="Virtue"
              onClick={this.saveReaction.bind(this, "virtue")}
            >
              👼
            </button>
          </div>
          <div className="konfession-reaction">
            <div>{this.state.sinCount}</div>
            <button
              className={
                "btn-primary btn-reaction btn-circle " +
                (this.state.selfReaction.attrs.type === "sin"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              title="Sin"
              onClick={this.saveReaction.bind(this, "sin")}
            >
              😈
            </button>
          </div>
          <div className="konfession-reaction">
            <div>{this.state.deadlySinCount}</div>
            <button
              className={
                "btn-primary btn-reaction btn-circle " +
                (this.state.selfReaction.attrs.type === "deadly sin"
                  ? "btn-selected"
                  : "")
              }
              data-toggle="tooltip"
              title="Deadly Sin"
              onClick={this.saveReaction.bind(this, "deadly sin")}
            >
              💀
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
