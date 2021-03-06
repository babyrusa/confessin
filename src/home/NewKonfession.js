import React, { Component } from "react";
import Konfession from "../models/Konfession";
import AddEmoji from "../shared/AddEmoji";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { Picker, emojiIndex } from "emoji-mart";
import "@webscopeio/react-textarea-autocomplete/style.css";
import Hashtag from "../models/Hashtag";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Edit3, MapPin } from "react-feather";

export default class NewKonfession extends Component {
  constructor(props) {
    super(props);
    this.list = ["apple", "bee", "boo", "bee_bee_baby_bee", "NeedAdvice"];
    this.state = {
      confession: "",
      isButtonLoading: false,
      isLoading: false,
      showInput: false,
      setLocation: false
    };
  }

  onShowInput() {
    this.setState({
      showInput: !this.state.showInput
    });
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
  async promiseOptions(e) {
    const _hashtags = await Hashtag.fetchList({
      text: { $regex: e.toLowerCase() }
    });
    return new Promise(resolve => {
      resolve(
        _hashtags.map(tag => ({ label: tag.attrs.text, value: tag.attrs.text }))
      );
    });
  }

  addConfession() {
    if (this.state.setLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.createKonfessionWithLocation.bind(this)
        );
      } else {
        alert("Unable to get your location");
        // console.log("not geo")
      }
    } else {
      this.createKonfessionWithoutLocation();
    }
  }

  onSetLocation(e) {
    this.setState({
      setLocation: e.target.checked
    });
  }

  // getLocation(){
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.print);
  //   } else {
  //     alert("Unable to get your location")
  //     // console.log("not geo")
  //   }
  // }

  async createKonfessionWithLocation(location) {
    if (this.state.confession.trim() !== "") {
      this.setState({ isButtonLoading: true });
      const { userSession } = this.props;
      const totalConf = await Konfession.fetchList(
        { sort: "-createdAt", limit: 1 },
        { decrypt: this.props.userSession.isUserSignedIn() }
      );
      try {
        const konfession = new Konfession({
          username: userSession.loadUserData().username,
          text: this.state.confession,
          index:
            totalConf.length > 0 ? Number(totalConf[0].attrs.index) + 1 : 1,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        await konfession.save();
        await this.handleHashtags(konfession);

        this.setState({
          confession: "",
          isButtonLoading: false,
          showInput: false
        });
        // this.props.history.push(`/`)
        this.props.fetchKonfessions();
      } catch (e) {
        this.setState({ isButtonLoading: false });
        console.log(e);
      }
    }
  }
  async createKonfessionWithoutLocation() {
    console.log("without locaiton");
    if (this.state.confession.trim() !== "") {
      this.setState({ isButtonLoading: true });
      const { userSession } = this.props;
      const totalConf = await Konfession.fetchList(
        { sort: "-createdAt", limit: 1 },
        { decrypt: this.props.userSession.isUserSignedIn() }
      );
      try {
        const konfession = new Konfession({
          username: userSession.loadUserData().username,
          text: this.state.confession,
          index: totalConf.length > 0 ? Number(totalConf[0].attrs.index) + 1 : 1
        });
        await konfession.save();
        await this.handleHashtags(konfession);

        this.setState({
          confession: "",
          isButtonLoading: false,
          showInput: false
        });
        // this.props.history.push(`/`)
        this.props.fetchKonfessions();
      } catch (e) {
        this.setState({ isButtonLoading: false });
        console.log(e);
      }
    }
  }

  async handleHashtags(konfession) {
    const hashtags = this.state.confession.match(/\#\w+\b/g);
    let addedHashtag = [];
    if (hashtags) {
      for (let _hashtag of hashtags) {
        if (!addedHashtag.includes(_hashtag)) {
          const hashtag = new Hashtag({
            konfessionId: konfession._id,
            text: _hashtag.replace("#", "")
          });
          await hashtag.save();
          addedHashtag.push(_hashtag);
        }
      }
    }
  }
  // print(location) {
  //   return location.coords;
  // }
  render() {
    const colourOptions = [
      { label: "blue", value: "blue" },
      { label: "pink", value: "pink" },
      { label: "white", value: "white" }
    ];
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        {/* <div className="col-md-10 col-lg-10 col-xl-6 mx-auto"> */}
        <button
          className={
            "btn btn-light newconfession-butt " +
            (this.state.showInput ? "newconfession-butt-selected" : "")
          }
          data-toggle="tooltip"
          title="Spill some tea"
          onClick={this.onShowInput.bind(this)}
        >
          <Edit3 size={30} />
        </button>
        {this.state.showInput && (
          <div id="newconfession-wrapper">
            <div id="newconfession-textarea">
              <textarea
                className="form-control"
                maxLength="63206"
                rows="5"
                value={this.state.confession}
                onChange={this.onConfessionChange.bind(this)}
                placeholder="Spill some tea. Don't worry, no one knows your identity but you!"
              ></textarea>
              <div className="location-switch-wrapper" >
                <label className="switch" data-toggle="tooltip" title="Set location for this post">
                  <input
                    type="checkbox"
                    checked={this.state.setLocation}
                    onChange={e => this.onSetLocation(e)}
                    data-checked="On"
                    data-unchecked="Off"
                  />
                  <span className="slider round"></span>
                  <div id="on">on</div>
                  <div id="off">off</div>
                </label>
                {/* <div style={{paddingLeft : '10px'}}>
                  Location Detector: {this.state.setLocation ? "on" : "off"}
                </div> */}
              </div>
            </div>
            {/* <AsyncCreatableSelect
            isMulti
            cacheOptions
            defaultOptions
            placeholder = "Add topics"
            loadOptions={this.promiseOptions.bind(this)}
            onChange={this.handleCreate.bind(this)}
          /> */}
            <div className="newkonfession-buttons">
              <AddEmoji addEmoji={this.addEmoji.bind(this)} />
              <button
                className="btn-primary btn-circle"
                id="add-confession-button"
                disabled={this.state.isButtonLoading}
                onClick={this.addConfession.bind(this)}
                data-toggle="tooltip"
                title="Add confession"
              >
                {!this.state.isButtonLoading ? "+" : "..."}
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
