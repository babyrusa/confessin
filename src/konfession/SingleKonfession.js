import React, { Component } from "react";
import Konfession from "../models/Konfession";
import KonfessionReaction from "./KonfessionReaction";
import KonfessionComment from "./KonfessionComment";
import TimeStamp from "../shared/timestamp.js";
import KonfessionCommentSection from "./KonfessionCommentSection";
import KonfessionHashtag from "./KonfessionHashtag";
import KonfessionMoreButton from "./KonfessionMoreButton";

export default class SingleKonfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode : false,
      konfession : {
        attrs : {
          _id : '',
          createdAt : '',
          text : '',
          username : '',
          anonymousIdentity : '',
          index : 0,
        }
      },
      editedKonfession : ''
    };
    
  }

  async componentDidMount(){
    if (this.props.match && this.props.match.params.konfessionId){
      console.log("url")
      let _konf = await Konfession.findById(this.props.match.params.konfessionId,
         { decrypt: this.props.userSession.isUserSignedIn() })
      if (_konf){
        this.setState({
          konfession : _konf
        })
      } else {
      this.props.history.push(`/`)
      }
    } else {
      this.setState({
        konfession : this.props.konfession
      })
    }
  }
  componentDidUpdate(prevProps){
    if (prevProps.konfession !== this.props.konfession) {
      this.setState({
        konfession : this.props.konfession
      })
    }
  }
  editKonfession(){
    try {
      this.setState({
        editedKonfession : this.props.konfession.attrs.text,
        editMode : true
      })
    } catch(e){
      alert("we apologize. Unable to edit confession at the moment. Please report issue and Try again later.")
    }

  }
  stopEditKonfession(){
    this.setState({
      editMode : false
    })
  }
  onEditKonfession(e){
    this.setState({
      editedKonfession : e.target.value,
    })
  }
  async saveEdittedKonfession(){
    try {
    this.props.konfession.update({
      text : this.state.editedKonfession
    })
    await this.props.konfession.save()
    this.stopEditKonfession()
    // window.location.reload(false);
    } catch(e){
      alert("unable to save, try again later")
    }
  }

  render() {
    return (
      <div className="singlekonfession">
        <KonfessionMoreButton
          deleteSketch={this.props.deleteSketch}
          konfession={this.props.konfession}
          userSession={this.props.userSession}
          fetchKonfessions={this.props.fetchKonfessions}
          editKonfession = {this.editKonfession.bind(this)}
        />
        <div>
          <p>Confession {this.props.konfession.attrs.index}</p>
          <small>
            {TimeStamp.convertDate(
              this.props.konfession.attrs.createdAt
            ).toLowerCase()}
          </small>
          {!this.state.editMode ? <div>
            <i className="fas fa-quote-left"></i>
            <h1>{this.props.konfession.attrs.text}</h1>
            <i className="fas fa-quote-right"></i>
            </div> :
            <div>
            <textarea
            maxLength="63206"
            rows="5"
            className="form-control editKonfession"
            value={this.state.editedKonfession}
            onChange={this.onEditKonfession.bind(this)} >
            </textarea> 
            <button className="btn btn-primary" onClick={this.saveEdittedKonfession.bind(this)}>Save</button>
            <button className="btn btn-outline-secondary" onClick={this.stopEditKonfession.bind(this)}>Cancel</button>
            </div> 
          }
        </div>
        <KonfessionHashtag
          konfession={this.props.konfession}
          userSession={this.props.userSession}
        />
        <KonfessionReaction
          konfession={this.props.konfession}
          userSession={this.props.userSession}
          openModal={this.props.openModal}
        />
        <KonfessionCommentSection
          konfession={this.props.konfession}
          userSession={this.props.userSession}
        />
      </div>
    );
  }
}
