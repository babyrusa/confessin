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

  async fetchHashtags(){
    const _hashtags = await Hashtag.fetchList({konfessionId : this.props.konfession.attrs._id}, { decrypt: false })
    this.setState({
      hashtags : _hashtags
    })
  }

  render(){
    const {konfession} = this.props
    return(
      this.state.hashtags.map(hashtag => {
        return <Link to='/'>#{hashtag.attrs.text}</Link>
      })
    )
  }
}