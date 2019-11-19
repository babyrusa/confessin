import React, { Component } from "react";
import { Image } from "react-feather";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default class AddImage extends Component {
  constructor(props) {
    super(props);
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
          className="btn btn-emoji"
          data-toggle="tooltip"
          title="Insert an emoji"
          onClick={this.toggleEmojiPicker.bind(this)}
        >
          <Image size={this.props.size ?  this.props.size : '24'}/>
        </button>
        {this.state.showEmojiPicker && (
          <Picker set="emojione" onSelect={this.props.addEmoji} />
        )}
      </React.Fragment>
    );
  }
}
