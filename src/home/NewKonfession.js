import React, { Component } from "react";
import Konfession from "../models/Konfession";
import AddEmoji from "../shared/AddEmoji";
import AddImage from "../shared/AddImage";

export default class NewKonfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confession : ''
    }
  }
  onConfessionChange(e) {
    this.setState({
      confession : e.target.value
    })
  }
  addEmoji(emoji){
    this.setState({
      confession : this.state.confession+emoji.native
    })
  }
  async addConfession(){
    const { userSession } = this.props
    const totalConf = await Konfession.count() + 1
    try {
      const konfession = new Konfession({
        username: userSession.loadUserData().username,
        text: this.state.confession,
        index: totalConf,
      })
      await konfession.save()
      // this.props.history.push(`/`)

    } catch (e) {
      alert("We apologize. Unable to create new confession. Try again later")
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="newconfession-wrapper">
          
          <textarea
            id="newconfession-textarea"
            className="form-control"
            maxLength="63206"
            rows="5"
            value = {this.state.confession}
            onChange = {this.onConfessionChange.bind(this)}
          >
          </textarea>
          <AddEmoji addEmoji = {this.addEmoji.bind(this)}/>
          <AddImage addEmoji = {this.addEmoji.bind(this)}/>
          <button className="btn btn-primary" id="add-confession-button" onClick={this.addConfession.bind(this)}>Add Konfession</button>
        </div>
      </React.Fragment>
    );
  }
}
