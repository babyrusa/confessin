import React, { Component } from "react";
import Comment from "../models/Comment";
import Reaction from "../models/Reaction";
import Konfession from "../models/Konfession";
import Notification from "../models/Notification";
import TimeStamp from "../shared/timestamp.js";

export default class NotificationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      notifcations : []

    };
  }
  async fetchNotifications(){
    console.log(new Date().getTime())
    let _notis = await Notification.fetchOwnList();
    this.setState({
      notifcations : _notis
    })
    this.loadNewNoti()
  }

  async loadNewNoti() {
    const {userSession} = this.props
    console.log(userSession.loadUserData().username)
    const time = this.state.notifcations.length > 0 ? this.state.notifcations[this.state.notifcations.length-1].attrs.createdAt : ''

    let _konf  = await Konfession.fetchOwnList();
    for (let i = 0 ; i < _konf.length; i++) {
      const _reactions = await Reaction.fetchList({
        createdAt : {'$gte' : time },
        // username : {'$ne' : userSession.loadUserData().username},
        konfessionId : _konf[i].attrs.konfessionId })
        console.log(_reactions)
      for (let j = 0 ; i < _reactions.length; i++) {
        //TODO
        // if(_reactions[i].attrs.username !== )
        const _noti = new Notification({
          text : _reactions[i].attrs.type+" reaction",
          konfessionId : _reactions[i].attrs._id,
          konfessionPreview : _konf[i].attrs.text.substring(0,31),
          madeAt : _reactions[i].attrs.createdAt 
        })
        console.log(_noti)
        await _noti.save()
        this.state.notifcations.push(_noti)
      }
    }
    
    //fetch all self confessions
    //loop through each confession , fetch all reaction & comment has that konfessionId 
    //make self-notification model
    //
  }
  render() {
    return (
      <div className="nav-link">
        <div className="btn-group">
          {/* <i class="fas fa-comment-dots ikonfess-dark d-sm-block d-md-none"></i> */}
          <button
            className="btn notification-dropdown dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={this.fetchNotifications.bind(this)}
          >
            <i className="fas fa-bell fa-2x ikonfess-dark"></i>
          </button>
          <div className="notification-wrapper dropdown-menu">
            {this.state.notifcations.length > 0 ? this.state.notifcations.map(noti => {
              return <div class="dropdown-item noti-unread">
                You have new <b>{noti.attrs.text}</b> at confession "<i>{noti.attrs.konfessionPreview}</i>"
                &nbsp;<small>{TimeStamp.convertDate(noti.attrs.madeAt).toLowerCase()}</small>
              </div>
            }) : <div className="p-2">You don't have any notifcations yet</div>}
          </div>
        </div>
      </div>
    );
  }
}
