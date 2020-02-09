import React, { Component } from "react";
import AddEmoji from "../shared/AddEmoji";
import AddImage from "../shared/AddImage";
import Comment from "../models/Comment";
import { User } from "radiks/lib";
var animals = require('../animals.json'); 

const DEFAULT_HEIGHT = 40;

export default class KonfessionNewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      anonymousIdentity : ""
    };
  }

  componentDidMount(){
    this.setFilledTextareaHeight()
    if (this.props.userSession.isUserSignedIn()) {
      this.haveCommentedBefore()
    }
  }
  componentDidUpdate(){
  }
  setFilledTextareaHeight() {
      const element = this.ghost;
      this.setState({
        height: element.clientHeight,
      });
  }
  addEmoji(emoji) {
    this.setState({
      comment: this.state.comment + emoji.native
    });
  }
  onCommentChange(e) {
    this.setState({
      comment: e.target.value
    });
  }
  randomAnimalPicker(){
    return animals[Math.floor(Math.random() * animals.length)];
    //make sure this animal hasnt commented before
  }
  async haveCommentedBefore() {
    const _ownList = await Comment.fetchOwnList({konfessionId : this.props.konfession.attrs._id, sort: '-createdAt'})
    if (_ownList.length > 0) {
      this.setState({
        anonymousIdentity : _ownList[0].attrs.anonymousIdentity
      })
    } else {
      this.setState({
        anonymousIdentity : ""
      })
    }
  }
  async postComment(e) {
    this.setFilledTextareaHeight()

    if (e.key === "Enter") {
      e.preventDefault()
      const _randomAnimal = this.state.anonymousIdentity === "" ? ("Anonymous "+this.randomAnimalPicker()) : this.state.anonymousIdentity
      try {
        const newComment = new Comment({
          anonymousIdentity : _randomAnimal,
          username: User.currentUser()._id,
          konfessionId: this.props.konfession.attrs._id,
          text: this.state.comment
        });
        await newComment.save();
        this.props.fetchComments();
        this.setState({
          comment: ""
        });
      } catch (e) {
        // alert("cannot post comment atm");
        console.log(e);
      }
    }
  }
  getGhostField() {
    return (
      <div
        className="textarea textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {this.state.comment}
      </div>
    );
  }
  render() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height, value } = this.state;
    return (
      <div className="konfession-comment-wrapper" style={{position:"relative"}}>
        <div className="konfession-comment">
          <textarea
            type="text"
            className="form-control"
            placeholder="Drop your thoughts..."
            value={this.state.comment}
            style={{ height,
              resize: isOneLine ? "none" : null}}
            onChange={this.onCommentChange.bind(this)}
            onKeyDown={this.postComment.bind(this)}
            onKeyUp={this.setFilledTextareaHeight.bind(this)}
          />
        </div>
        {this.getGhostField()}
        <div style={{}}>
          <AddEmoji addEmoji={this.addEmoji.bind(this)} size="20" />
        </div>
      </div>
    );
  }
}
