import React, { Component } from "react";
import Hashtag from "../models/Hashtag";
import { Link } from "react-router-dom";

export default class KonfessionHashtag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags : []
    }
  }

  componentDidMount(){
    this.fetchHashtags()
  }
  componentDidUpdate(prevProps){
    if (prevProps.konfession !== this.props.konfession) {
      this.fetchHashtags()
    }
  }

  async fetchHashtags(){
    const _hashtags = await Hashtag.fetchList({konfessionId : this.props.konfession.attrs._id}, 
      { decrypt: this.props.userSession.isUserSignedIn() })
    this.setState({
      hashtags : _hashtags
    })
  }

  render(){
    const {konfession} = this.props
    return(
      <div className="confession-hashtags">
      {this.state.hashtags.map(hashtag => {
        return <Link to={`/hashtag/${hashtag.attrs.text}`}
        key={hashtag.attrs._id}>#{hashtag.attrs.text}</Link>
      })}
      </div>
    )
  }
}