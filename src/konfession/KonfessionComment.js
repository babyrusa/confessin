import React, { Component } from "react";
import AddEmoji from "../shared/AddEmoji";
import AddImage from "../shared/AddImage";
import Comment from "../models/Comment";
import { User } from "radiks/lib";
const DEFAULT_HEIGHT = 40;

export default class KonfessionComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  componentDidMount(){
    this.setFilledTextareaHeight()
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
  async postComment(e) {
    this.setFilledTextareaHeight()
    if (e.key === "Enter") {
      try {
        console.log(this.state.comment);
        const newComment = new Comment({
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
        alert("cannot post comment atm");
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
      <div id="konfession-comment-wrapper">
        <div id="konfession-comment">
          <textarea
            id="konfession-comment-textarea"
            type="text"
            class="form-control"
            placeholder="Drop your thoughts..."
            value={this.state.comment}
            style={{ height,
              resize: isOneLine ? "none" : null}}
            onChange={this.onCommentChange.bind(this)}
            onKeyDown={this.postComment.bind(this)}
            onKeyUp={this.setFilledTextareaHeight.bind(this)}

            // style={{height : '10px'}}
          />
        </div>
        {this.getGhostField()}
        <div>
          <AddEmoji addEmoji={this.addEmoji.bind(this)} size="20" />
        </div>
      </div>
    );
  }
}
