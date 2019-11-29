import React, { Component } from "react";
import Konfession from "../models/Konfession";
import AddEmoji from "../shared/AddEmoji";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { Picker, emojiIndex } from "emoji-mart";
import "@webscopeio/react-textarea-autocomplete/style.css";
import Hashtag from "../models/Hashtag";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";

export default class NewKonfession extends Component {
  constructor(props) {
    super(props);
    this.list = ["apple", "bee", "boo", "bee_bee_baby_bee", "NeedAdvice"];
    this.state = {
      confession: "",
      topic: "",
      topics: [],
      isButtonLoading: false,
      isLoading: false
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
  handleChange(newValue, actionMeta) {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
    this.setState({ isLoading: true });
  }
  handleCreate(e) {
    console.log(e)
    this.setState({
      topics: e
    })
  }
  async promiseOptions(e) {
    const _hashtags = await Hashtag.fetchList({ text: { $regex: e.toLowerCase() } })
    return new Promise(resolve => {
      resolve(_hashtags.map(tag => ({ label: tag.attrs.text, value: tag.attrs.text })))
    })
  }


  async addConfession() {
    if (this.state.confession.trim() !== "") {
      this.setState({ isButtonLoading: true });
      const { userSession } = this.props;
      const totalConf = await Konfession.fetchList(
        {sort: "-createdAt", limit : 1, },
        { decrypt: this.props.userSession.isUserSignedIn() });
      console.log("total conf",totalConf)
      try {
        const konfession = new Konfession({
          username: userSession.loadUserData().username,
          text: this.state.confession,
          index: totalConf ? (Number(totalConf[0].attrs.index)+1) : 1 
        });
        console.log(konfession);
        await konfession.save();
        for (let i = 0; i < this.state.topics.length; i++) {
          const hashtag = new Hashtag({
            konfessionId: konfession._id,
            text: this.state.topics[i].value
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
    const colourOptions = [
      { label: "blue", value: "blue" },
      { label: "pink", value: "pink" },
      { label: "white", value: "white" }
    ];
    const { isLoading } = this.state;
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
              placeholder="Spill some tea. Don't worry, noone knows your identity but you!"
            ></textarea>
          </div>
          <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={this.promiseOptions.bind(this)}
            onChange={this.handleCreate.bind(this)}
          />
          <AddEmoji addEmoji={this.addEmoji.bind(this)} />
          <button
            className="btn btn-primary"
            id="add-confession-button"
            disabled={this.state.isButtonLoading}
            onClick={this.addConfession.bind(this)}
          >
            {!this.state.isButtonLoading ? "Add Confession" : "Loading..."}
          </button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </React.Fragment>
    );
  }
}
