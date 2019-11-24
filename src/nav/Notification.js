import React, { Component } from "react";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  fetchNotifications(){
    //fetch all self confessions
    //loop through each confession , fetch all reaction & comment has that konfessionId 
    //make self-notification model
    //
  }
  render() {
    return (
      <div className="nav-link">
        <div class="btn-group">
          {/* <i class="fas fa-comment-dots ikonfess-dark d-sm-block d-md-none"></i> */}
          <button
            className="btn notification-dropdown dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-comment-dots fa-2x ikonfess-dark"></i>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>
        </div>
      </div>
    );
  }
}
