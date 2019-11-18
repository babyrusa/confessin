import React, { Component } from "react";
import { Smile } from "react-feather";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

export default class KonfessionComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment : '',
      showEmojiPicker : false,

    };
  }

  toggleEmojiPicker() {
    this.setState({
      showEmojiPicker : !this.state.showEmojiPicker
    })
  }

  addEmoji(emoji){
    this.setState({
      comment : this.state.comment+emoji.native
    })
  }
  onCommentChange(e){
    this.setState({
      comment : e.target.value
    })
  }
  postComment(e){
    if (e.key === 'Enter') {
      console.log(this.state.comment)
    }
  }
  render() {
    return (
      <div id="konfession-comment">
        10comments
        <input
          type="text"
          class="form-control"
          placeholder="Drop your thoughts..."
          value = {this.state.comment}
          onChange = {this.onCommentChange.bind(this)}
          onKeyDown = {this.postComment.bind(this)}
        />
        <button type="button" className="btn toggle-emoji"
        data-toggle="tooltip" title="Insert an emoji"
        onClick={this.toggleEmojiPicker.bind(this)}>
          <Smile />
        </button>
        { this.state.showEmojiPicker && 
        <Picker set="emojione" onSelect={this.addEmoji.bind(this)} />

        }
      </div>
    );
  }
}
