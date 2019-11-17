import React, { Component } from "react";
import Konfession from "../models/Konfession";

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
  async addConfession(){
    const { userSession } = this.props
    console.log(this.state.confession)
    console.log("user name",userSession.loadUserData().username)
    const totalConf = await Konfession.count() + 1
    try {
      const konfession = new Konfession({
        username: 'jessicaanhdao.id.blockstack',
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
            maxLength="5"
            rows="5"
            value = {this.state.confession}
            onChange = {this.onConfessionChange.bind(this)}
          >
          </textarea>
          <button className="btn btn-primary" onClick={this.addConfession.bind(this)}>Add Konfession</button>
        </div>
      </React.Fragment>
    );
  }
}
