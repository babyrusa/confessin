import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
const avatarFallbackImage = '/images/confessin-small3.png';

export default class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl : ''
    }
  }
  render(){
    const { avatarUrl } = this.state;
    const { classes } = this.props;
    return(
      < div className={classes ? classes : "photos"}
      style={{
      backgroundImage: `url(${ avatarUrl ? avatarUrl : avatarFallbackImage })` ,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'}}/>
    )
  }
  async getProfilePic(){
    const {person} = this.props;
    fetch(person.avatarUrl(),  {method: "GET", mode: 'cors'})
    .then((response) => {
      response.blob()
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        this.setState({
          avatarUrl : url
        })
      })
    })
  }
  componentDidMount(){
    const { person } = this.props;
    this.getProfilePic()
  }
  componentDidUpdate(prevProps){
    if (prevProps.person !== this.props.person){
      this.getProfilePic();
    }
  }
}