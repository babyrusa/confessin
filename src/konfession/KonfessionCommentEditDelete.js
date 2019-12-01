import React, { Component } from "react";
import Hashtag from "../models/Hashtag";
import { Link } from "react-router-dom";

export default class KonfessionCommentEditDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  isOwner() {
    const { userSession } = this.props
    if (userSession.isUserSignedIn()) {
      return userSession.loadUserData().username === this.props.comment.attrs.username
    }
    return false;
  }

  async deleteComment(){
    const { comment } = this.props;
    await comment.destroy();
    this.props.fetchComments()
  }

  
  render() {
    return (
      this.isOwner() &&
      <React.Fragment>
        <div className="dropdown">
          <div
            className="btn-more"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            title="Love"
          >
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  className="dropdown-item"
                  onClick={() => this.deleteComment()}
                >
                  <i className="fas fa-trash ikonfess"></i>&nbsp;&nbsp; Delete
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.props.editComment}
                >
                  <i className="fas fa-pen ikonfess"></i>&nbsp;&nbsp;Edit
                </a>
          </div>
        </div>
      </React.Fragment>
  
    );
  }
}
