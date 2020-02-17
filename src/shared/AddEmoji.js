import React, { Component } from "react";
import { Smile } from "react-feather";
import { Picker, Emoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import data from 'emoji-mart/data/emojione.json'

export default class AddEmoji extends Component {
  constructor(props) {
    super(props);
    // const sheetUrl = Emoji.defaultProps.backgroundImageFn('emojione', 64)
    // const oReq = new XMLHttpRequest();
    // oReq.open("GET", sheetUrl);
    // oReq.send();
    this.state = {
      showEmojiPicker: false
    };
  }
  toggleEmojiPicker() {
    this.setState({
      showEmojiPicker : !this.state.showEmojiPicker
    })
  }
  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn-primary btn-emoji btn-circle"
          data-toggle="tooltip"
          title="Insert an emoji"
          onClick={this.toggleEmojiPicker.bind(this)}
        >
          <Smile size={this.props.size ?  this.props.size : '24'}/>
        </button>
        {this.state.showEmojiPicker && (
          <Picker set="emojione" sheetSize="32"
          data={data}
          onSelect={this.props.addEmoji} 
          title='Pick your emoji…' emoji='point_up' color="#ff66b6"
          />

        )}
      </React.Fragment>
    );
  }
}
