import React, { Component } from "react";
import TimeStamp from "../shared/timestamp.js";
import Comment from "../models/Comment.js";
import KonfessionComment from "./KonfessionComment.js";
import KonfessionCommentEditDelete from "./KonfessionCommentEditDelete.js";

export default class KonfessionCommentSection extends Component {
  incrementLimit = 5;
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      olderComments: [], //prefetch
      loadedAll: true,
      offset: 3
    };
  }
  componentDidMount() {
    this.fetchComments();
    this.prefetchComments();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.konfession !== this.props.konfession) {
      this.fetchComments();
      this.prefetchComments();
    }
  }
  async fetchComments() {
    try {
      let _comments = await Comment.fetchList(
        {
          konfessionId: this.props.konfession.attrs._id,
          sort: "-createdAt",
          limit: this.state.offset
        },
        { decrypt: false }
      );

      this.setState({
        comments: _comments.reverse()
      });
    } catch (e) {
      alert("there is an error, please try again later");
    }
  }

  loadMoreComments() {
    this.setState({
      comments: this.state.olderComments
    });
    this.prefetchComments();
  }
  async prefetchComments() {
    let newOffset = this.state.offset + this.incrementLimit;
    let _comments = await Comment.fetchList(
      {
        konfessionId: this.props.konfession.attrs._id,
        sort: "-createdAt",
        limit: this.incrementLimit,
        offset: this.state.offset
      },
      { decrypt: false }
    );
    if (_comments.length === 0) {
      this.setState({
        loadedAll: true
      });
    } else {
      this.setState({
        olderComments: _comments.reverse().concat(this.state.comments),
        offset: newOffset,
        loadedAll: false
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div id="comment-section">
          {!this.state.loadedAll && (
            <div id="loadmore">
              <small onClick={this.loadMoreComments.bind(this)}>
                Load more komments...
              </small>
            </div>
          )}
          {this.state.comments.map(comment => {
            return (
              <div className="single-comment" key={comment.attrs._id}>
                <KonfessionCommentEditDelete
                  userSession={this.props.userSession}
                  konfession={this.props.konfession}
                  comment={comment}
                  fetchComments={this.fetchComments.bind(this)}
                />
                <small className="ikonfess">
                  {comment.attrs.anonymousIdentity
                    ? comment.attrs.anonymousIdentity
                    : "Anonymous sinner"}
                </small>
                <div>
                  <p>{comment.attrs.text}</p>
                </div>
                <div>
                  <small>
                    {TimeStamp.convertDate(
                      comment.attrs.createdAt
                    ).toLowerCase()}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
        {this.props.userSession.isUserSignedIn() && (
          <KonfessionComment
            konfession={this.props.konfession}
            fetchComments={this.fetchComments.bind(this)}
            userSession={this.props.userSession}
          />
        )}
      </React.Fragment>
    );
  }
}
