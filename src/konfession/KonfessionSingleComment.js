import React, { Component } from "react";
import TimeStamp from "../shared/timestamp.js";
import Comment from "../models/Comment.js";
import KonfessionNewComment from "./KonfessionNewComment.js";
import KonfessionCommentEditDelete from "./KonfessionCommentEditDelete.js";

export default class KonfessionSingleComment extends Component {
  incrementLimit = 5;
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editedComment: ""
    };
  }
  editComment() {
    this.setState({
      editedComment: this.props.comment.attrs.text,
      editMode: true
    });
  }
  onEditComment(e) {
    this.setState({
      editedComment: e.target.value
    });
  }
  cancelEditComment() {
    this.setState({
      editMode: false
    });
  }
  async saveEdittedComment(e) {
    if (e.key === "Enter") {
      try {
        this.props.comment.update({
          text: this.state.editedComment
        });
        await this.props.comment.save();
        this.cancelEditComment();
        // window.location.reload(false);
      } catch (e) {
        alert("we apologize. unable to save, try again later");
      }
    }
  }
  render() {
    const { comment } = this.props;
    return (
      <div className="single-comment" key={comment.attrs._id}>
        <KonfessionCommentEditDelete
          userSession={this.props.userSession}
          konfession={this.props.konfession}
          comment={comment}
          fetchComments={this.props.fetchComments}
          editComment={this.editComment.bind(this)}
        />
        {!this.state.editMode ? (
          <React.Fragment>
            <small className="ikonfess">
              {comment.attrs.anonymousIdentity
                ? comment.attrs.anonymousIdentity
                : "Anonymous Sinner"}
            </small>
            <div>
              <p>{comment.attrs.text}</p>
            </div>
            <div>
              <small style={{padding : '5px'}}>
                {TimeStamp.convertDate(comment.attrs.createdAt).toLowerCase()}
              </small>
              <small style={{padding : '5px'}}>
               {comment.attrs.updatedAt !== comment.attrs.createdAt ? 'Edited' : ''}
              </small>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="konfession-comment">
              <textarea
                id="konfession-comment-textarea"
                type="text"
                className="form-control"
                placeholder="Drop your thoughts..."
                value={this.state.editedComment}
                // style={{ height, resize: isOneLine ? "none" : null }}
                onChange={this.onEditComment.bind(this)}
                onKeyDown={this.saveEdittedComment.bind(this)}
                // onKeyUp={this.setFilledTextareaHeight.bind(this)}
              />
            </div>
            <a
              className="btn btn-sm"
              style={{ fontSize: "0.5rem" }}
              onClick={this.cancelEditComment.bind(this)}
            >
              Cancel
            </a>
          </React.Fragment>
        )}
      </div>
    );
  }
}
