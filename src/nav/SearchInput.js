import React, { Component } from "react";
import Hashtag from "../models/Hashtag";
import { Link } from "react-router-dom";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: "",
      hashtags: [],
      hashtagCount: 0
    };
  }
  async onChangeHandler(e) {
    this.setState({
      hashtag: e.target.value
    });
    if (e.target.value.trim() !== "") {
      const _hashtags = await Hashtag.fetchList(
        {
          text: { $regex: e.target.value }
        },
        { decrypt: this.props.userSession.isUserSignedIn() }
      );
      console.log(_hashtags);
      // const _count = await Hashtag.count({ text: e.target.value });
      const _count = 100;
      this.setState({
        hashtags: _hashtags
      });
    }
  }
  searchHashtags() {}
  render() {
    return (
      <React.Fragment>
        <div className="collapse navbar-collapse nav-link" id="filter-wrapper">
          <input
            id="filterByPrompt"
            type="text"
            className="form-control nav-filter"
            style={{ fontFamily: "sans-serif, FontAwesome" }}
            placeholder="&#xF002; Filter Konfessions by Hashtags"
            value={this.state.hashtag}
            onChange={this.onChangeHandler.bind(this)}
          />
          {this.state.hashtag !== "" && (
            <ul className="list-group" id="filterHashtag">
              {this.state.hashtags.map(tag => {
                return (
                  <li className="list-group-item hashtag-li">
                    <Link to={`/hashtag/${tag.attrs.text}`}>
                      <b>#{tag.attrs.text} </b>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}
