import React, { Component } from 'react';
import Hashtag from './models/Hashtag';
import { Link } from "react-router-dom";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag : '',
      hashtagCount : 0
    }
  }
  async onChangeHandler(e){
    console.log(e.target.value)
    this.setState({
      hashtag: e.target.value,
    })
    const _count = await Hashtag.count({ text: e.target.value });
    console.log(_count)
    await this.setState({
      hashtagCount : _count
    })
    // this.props.setInput(e.target.value);
  }
  searchHashtags(){

  }
  render(){
    return(
      <React.Fragment>
      <div id="filter-wrapper">
        <input id="filterByPrompt" type="text" className="form-control nav-filter" 
        style={{fontFamily:'Arial, FontAwesome'}} placeholder="&#xF002; Filter Konfessions by Hashtags"
        value= {this.state.hashtag} onChange={this.onChangeHandler.bind(this)}/>
        {this.state.hashtag !== '' && 
          <Link to={`/hashtag/${this.state.hashtag}`}>
        <div id="filterHashtag">

            <b>#{this.state.hashtag} </b> <br></br>
            {this.state.hashtagCount} {this.state.hashtagCount > 1 ? 'konfessions' : 'konfession'}
            </div>
          </Link>
          
        }
      </div>
      </React.Fragment>
    )
  }


}