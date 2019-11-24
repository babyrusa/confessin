import React, { Component } from "react";
import Konfession from "../models/Konfession";
import AddEmoji from "../shared/AddEmoji";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { Picker, emojiIndex } from "emoji-mart";
import "@webscopeio/react-textarea-autocomplete/style.css";
import Hashtag from "../models/Hashtag";

export default class NewKonfession extends Component {
  constructor(props) {
    super(props);
    this.list = ["apple", "bee", "boo", "bee_bee_baby_bee", "NeedAdvice"];
    this.state = {
      confession: "",
      topic: "",
      topics: [],
      isButtonLoading: false
    };
  }
  onConfessionChange(e) {
    this.setState({
      confession: e.target.value
    });
  }
  addEmoji(emoji) {
    this.setState({
      confession: this.state.confession + emoji.native
    });
  }

  onTopicsChange(e) {
    e.target.value = e.target.value.trim();
    console.log(e.target.value);
    if (e.target.value.match(/^[#a-zA-Z_]*$/)) {
      this.setState({
        topic: e.target.value
      });
    }
  }
  addTopic(e) {
    if (e.key === "Enter" && this.state.topic !== "") {
      if (this.state.topics.length < 3) {
        console.log(this.state.topics, this.state.topic);
        const _topics = this.state.topics;
        _topics.push(this.state.topic.replace("#", ""));
        this.setState({
          topics: _topics,
          topic: ""
        });
      }
    }
  }
  async addConfession() {
    if (this.state.confession.trim() !== "") {
      this.setState({ isButtonLoading: true });
      const { userSession } = this.props;
      const totalConf = (await Konfession.count()) + 1;
      console.log("topics ", this.state.topics);
      try {
        const konfession = new Konfession({
          username: userSession.loadUserData().username,
          text: this.state.confession,
          index: totalConf
        });
        console.log(konfession);
        await konfession.save();
        for (let i = 0; i < this.state.topics.length; i++) {
          const hashtag = new Hashtag({
            konfessionId: konfession._id,
            text: this.state.topics[i]
          });
          await hashtag.save();
        }
        this.setState({
          confession: "",
          topics: [],
          topic: "",
          isButtonLoading: false
        });
        // this.props.history.push(`/`)
        this.props.fetchKonfessions();
      } catch (e) {
        this.setState({ isButtonLoading: false });
        alert("We apologize. Unable to create new confession. Try again later");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className="row"> */}
          {/* <div className="col-md-10 col-lg-10 col-xl-6 mx-auto"> */}
            <div id="newconfession-wrapper">
              <div id="newconfession-textarea">
                <textarea
                  className="form-control"
                  maxLength="63206"
                  rows="5"
                  value={this.state.confession}
                  onChange={this.onConfessionChange.bind(this)}
                  placeholder="Konfess here, don't worry, noone knows your identity but you"
                ></textarea>
                <div>
                  {this.state.topics.map(topic => {
                    return <span className="topic">#{topic} x</span>;
                  })}
                </div>
              </div>
              <ReactTextareaAutocomplete
                className="form-control"
                name="newMessage"
                value={this.state.topic}
                loadingComponent={() => <span>Loading</span>}
                onKeyPress={this.addTopic.bind(this)}
                onChange={this.onTopicsChange.bind(this)}
                placeholder="Hashtag topics. Start with # (3 max)"
                trigger={{
                  "#": {
                    dataProvider: token =>
                      this.list
                        .filter(i =>
                          i.toLowerCase().includes(token.toLowerCase())
                        )
                        .map(o => ({
                          word: o
                        })),
                    component: ({ entity: { word } }) => (
                      <div>{` ${word}`}</div>
                    ),
                    output: item => `#${item.word}`
                  }
                }}
              />
              <AddEmoji addEmoji={this.addEmoji.bind(this)} />
              <button
                className="btn btn-primary"
                id="add-confession-button"
                disabled={this.state.isButtonLoading}
                onClick={this.addConfession.bind(this)}
              >
                {!this.state.isButtonLoading ? "Add Konfession" : "Loading..."}
              </button>
            </div>
          {/* </div> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}
