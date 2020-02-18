import React, { Component } from "react";
import { Smile } from "react-feather";
import { Picker, Emoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
export default class AddEmoji extends Component {
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
          className="btn-primary btn-emoji btn-circle"
          data-toggle="tooltip"
          title="Insert an emoji"
          onClick={this.toggleEmojiPicker.bind(this)}
        >
          <Smile size={this.props.size ?  this.props.size : '24'}/>
        </button>
        {this.state.showEmojiPicker && (
          <Picker set="emojione" sheetSize="32"
          onSelect={this.props.addEmoji} 
          title='Pick your emoji…' emoji='point_up' color="#ff66b6"
          backgroundImageFn={(set, sheetSize) => {
            return '/images/emojione-32.png'
          }}
          />

        )}
      </React.Fragment>
    );
  }
}
