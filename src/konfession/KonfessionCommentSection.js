import React, { Component } from "react";
import TimeStamp from "./timestamp.js";
import Comment from "../models/Comment.js";
import KonfessionComment from "./KonfessionComment.js";

export default class KonfessionCommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      konfession: {
        attrs: {
          _id: "",
          username: "",
          index: "",
          createdAt: "",
          topic: []
        }
      }
    };
  }
  componentDidMount() {
    this.setState(
      {
        konfession: this.props.konfession
      },
      () => this.fetchComments()
    );
  }
  async fetchComments() {
    let _comments = await Comment.fetchList(
      { konfessionId: this.state.konfession.attrs._id, sort: '-createdAt' },
      { decrypt: false }
    );
    this.setState({
      comments: _comments
    });
  }
  render() {
    return (
      <React.Fragment>
        <KonfessionComment konfession={this.props.konfession}
        fetchComments = {this.fetchComments.bind(this)} />
        view all comments...
        <div id="comment-section">
          {this.state.comments.map(comment => {
            return (
              <div className="single-comment">
                <div>
                <p>{comment.attrs.text}</p>
                </div>
                <div>
                <small>
                  {TimeStamp.convertDate(comment.attrs.createdAt).toLowerCase()}
                </small>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
