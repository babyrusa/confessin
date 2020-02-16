import React, { Component } from "react";
import Comment from "../models/Comment";
import Reaction from "../models/Reaction";
import Konfession from "../models/Konfession";
import Notification from "../models/Notification";
import TimeStamp from "../shared/timestamp.js";
import { Link, withRouter } from "react-router-dom";

class NotificationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      notifcations: [],
      notiOpen: false
    };
  }
  async fetchNotifications() {
    if (this.state.notiOpen) {
      this.setState({
        notiOpen: false
      });
    } else {
      let _notis = await Notification.fetchOwnList();
      this.setState({
        notifcations: _notis.reverse(),
        notiOpen: true
      });
      this.loadNewNoti();
    }
  }

  async loadNewNoti() {
    const { userSession } = this.props;
    const time =
      this.state.notifcations.length > 0
        ? this.state.notifcations[this.state.notifcations.length - 1].attrs
            .createdAt
        : new Date("1997-04-01").getTime();

    let _konf = await Konfession.fetchOwnList();
    for (let i = 0; i < _konf.length; i++) {
      const _reactions = await Reaction.fetchList({
        createdAt: { $gte: time },
        konfessionId: _konf[i].attrs._id
      });
      for (let j = 0; j < _reactions.length; j++) {
        //TODO
        if (
          _reactions[j].attrs.username !== userSession.loadUserData().username
        ) {
          const _noti = new Notification({
            text: _reactions[j].attrs.type + " reaction",
            konfessionId: _reactions[j].attrs.konfessionId,
            konfessionPreview: _konf[i].attrs.text.substring(0, 31),
            madeAt: _reactions[j].attrs.createdAt
          });
          await _noti.save();
          this.state.notifcations.unshift(_noti);
        }
      }
      const _comments = await Comment.fetchList({
        createdAt: { $gte: time },
        konfessionId: _konf[i].attrs._id
      });
      for (let j = 0; j < _comments.length; j++) {
        //TODO
        if (
          _comments[j].attrs.username !== userSession.loadUserData().username
        ) {
          const _noti = new Notification({
            text: "comment",
            konfessionId: _comments[j].attrs.konfessionId,
            konfessionPreview: _konf[i].attrs.text.substring(0, 31),
            madeAt: _comments[j].attrs.createdAt
          });
          await _noti.save();
          this.state.notifcations.unshift(_noti);
        }
      }
    }

    //fetch all self confessions
    //loop through each confession , fetch all reaction & comment has that konfessionId
    //make self-notification model
    //
  }
  async onClickConfession(noti) {
    if (!noti.checked) {
      noti.update({
        checked: true
      });
      await noti.save();
    }
    await this.props.history.push(`/c/${noti.attrs.konfessionId}`);
  }
  async deleteNoti(noti) {
    try {
      await noti.destroy();
      let _notifcations = this.state.notifcations;
      _notifcations = _notifcations.filter(_noti => _noti !== noti);
      await this.setState({
        notifcations: _notifcations
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className="nav-link">
        <div className="btn-group">
          {/* <i class="fas fa-comment-dots ikonfess-dark d-sm-block d-md-none"></i> */}
          <button
            className="btn notification-dropdown"
            // data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={this.fetchNotifications.bind(this)}
          >
            <i className="fas fa-bell fa-2x ikonfess-dark"></i>
          </button>
          <div
            className={
              "notification-wrapper dropdown-menu " +
              (this.state.notiOpen ? "show" : "")
            }
          >
            {this.state.notifcations.length > 0 ? (
              this.state.notifcations.map(noti => {
                return (
                  // <Link to={`/c/${noti.attrs.konfessionId}`} key={noti.attrs._id}>

                  <div
                    className={
                      "dropdown-item notis " +
                      (noti.attrs.checked ? "noti-read" : "noti-unread")
                    }
                  >
                    <div
                      className="noti-trash"
                      onClick={this.deleteNoti.bind(this, noti)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </div>
                    <div onClick={this.onClickConfession.bind(this, noti)}>
                      You have a new <b>{noti.attrs.text}</b> at confession "
                      <i>{noti.attrs.konfessionPreview}...</i>" &nbsp;
                      <small>
                        {TimeStamp.convertDate(noti.attrs.madeAt).toLowerCase()}
                      </small>
                    </div>
                  </div>
                  // </Link>
                );
              })
            ) : (
              <div className="p-2">You don't have any notifcations yet</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(NotificationButton);
