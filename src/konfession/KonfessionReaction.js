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
        },
      },
      selfReactionType : ""
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
      },
      selfReactionType : ""
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
        // console.log("have liked");
        if (this.state.selfReaction.attrs.type === "virtue"){
          this.setState({
            virtueCount : this.state.virtueCount - 1
          })
        } else if (this.state.selfReaction.attrs.type === "sin") {
          this.setState({
            sinCount : this.state.sinCount - 1
          })
        } else if (this.state.selfReaction.attrs.type === "deadly sin") {
          this.setState({
            deadlySinCount : this.state.deadlySinCount - 1
          })
        }
       
        if (reactionType !== this.state.selfReaction.attrs.type) {
          // console.log("NOT same type");
          if (reactionType === "virtue"){
            this.setState({
              virtueCount : this.state.virtueCount + 1
            })
          } else if (reactionType === "sin") {
            this.setState({
              sinCount : this.state.sinCount + 1
            })
          } else if (reactionType === "deadly sin") {
            this.setState({
              deadlySinCount : this.state.deadlySinCount + 1
            })
          }
          this.state.selfReaction.update({
            type: reactionType
          });
          this.setState({
            selfReaction : this.state.selfReaction
          });
          await this.state.selfReaction.save()
         
        } else {
          // console.log("same type");
          await this.state.selfReaction.destroy()
          this.resetSelfReaction();
        }
      } else {
        // console.log("have NOT liked");
        if (reactionType === "virtue"){
          this.setState({
            virtueCount : this.state.virtueCount + 1
          })
        } else if (reactionType === "sin") {
          this.setState({
            sinCount : this.state.sinCount + 1
          })
        } else if (reactionType === "deadly sin") {
          this.setState({
            deadlySinCount : this.state.deadlySinCount + 1
          })
        }
          let _reaction = new Reaction({
            konfessionId: this.props.konfession.attrs._id,
            username: User.currentUser()._id,
            type: `${reactionType}`
          });
          this.setState({
            selfReaction : _reaction
          });
          await _reaction.save();

      }
      await this.fetchReactions();
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
              data-placement="bottom"
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
              data-placement="bottom"
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
              data-placement="bottom"
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
