import React, { Component } from "react";
import Konfession from "../models/Konfession";
import TimeStamp from "../shared/timestamp.js";
import { Dot } from "react-animated-dots";
import KonfessionHashtag from "../konfession/KonfessionHashtag";
import { Link, withRouter } from "react-router-dom";
import KonfessionCardReaction from "./KonfessionCardReaction";
import { MapPin } from "react-feather";
import Distance from "../shared/distance";

class KonfessionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      editMode: false,
      konfession: {
        attrs: {
          _id: "",
          createdAt: "",
          text: "",
          username: "",
          anonymousIdentity: "",
          index: 0
        }
      },
      editedKonfession: "",
      distance : 0
    };
  }
  componentDidMount(){
    // this.getLatLong();
    this.getLocation();
  }
  componentDidUpdate(prevProps){
    if(prevProps.konfession !== this.props.konfession){
      // this.getLatLong();
      this.getLocation();

    }
  }
  getLocation(){
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(
        this.getDistance.bind(this),
        this.error,
        options
      );
    } else {
      alert("Unable to get your location");
    }
  }
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  getLatLong(){
    const { konfession } = this.props;
    if (konfession.attrs.latitude && konfession.attrs.longitude){
      const {latitude , longitude} = Distance.getLatLonFromDistance(konfession.attrs.latitude , konfession.attrs.longitude, 1);
    }
  }
  getDistance(location){
    const { konfession } = this.props;
    console.log(location.coords.latitude,
      location.coords.longitude,
      location.coords.accuracy)
    const d = Distance.getDistanceFromLatLonInKm(
      location.coords.latitude,
      location.coords.longitude,
      konfession.attrs.latitude,
      konfession.attrs.longitude
      )
    this.setState({
      distance : d
    })
    // console.log(d)
    // return d;
  }
  onGoToPost(){
    const { konfession } = this.props;
    this.props.history.push(`/c/${konfession.attrs._id}`);
  }
  renderWithHashtags(){
    const { konfession } = this.props;

    const regex = /\#\w+\b/g;
    let text = konfession.attrs.text;
    let hashtags = text.match(regex);
    let parts = text.split(regex) // re is a matching regular expression
    let toReturn = JSON.parse(JSON.stringify(parts));
    for (let i = 0; i < (parts.length-1); i++) {
        toReturn.splice(i+1,0,<Link to={'/hashtag/' + hashtags[i].replace("#",'')}
      className="hashtag">{hashtags[i]}</Link>)
      // parts[i] = <Link to={'/hashtag/' + hashtags[i].replace("#",'')}>{hashtags[i]}</Link>
    }
    return toReturn;
  }
  render() {
    const { konfession } = this.props;
    const length = konfession.attrs.text.length;
    return (
      <div className="confession-card">
        {/* <Link to={`/c/${konfession.attrs._id}`} className="confession-card"> */}
        <span className="confession-index">
          {konfession.attrs.index}
          &#46;
        </span>
        <div className="confession-top">
          {konfession.attrs.latitude && konfession.attrs.longitude && <small data-toggle="tooltip" title="Location set" className="card-location">
            <MapPin/>
            {this.state.distance}
          </small>}
          <small style={{ padding: "5px" }}>
            {TimeStamp.convertDate(konfession.attrs.createdAt).toUpperCase()}
          </small>
          <small style={{ padding: "5px" }}>
            {konfession.attrs.updatedAt !== konfession.attrs.createdAt
              ? "Edited"
              : ""}
          </small>
        </div>
        <Link to={`/c/${konfession.attrs._id}`} className="confession-body">
        {/* <div className="confession-body" onClick={this.onGoToPost.bind(this)}> */}
          <div>
            <i className="fas fa-quote-left"></i>
            <h3
              style={{
                fontSize: length > 150 ? "15px" : "20px",
                fontWeight: "bold"
              }}
            >
              {this.renderWithHashtags()}

            </h3>
            <i className="fas fa-quote-right"></i>
          </div>
        {/* </div> */}
        </Link>
        <div className="confession-bottom">
        <KonfessionCardReaction
            konfession={konfession}
            userSession={this.props.userSession}
            // openModal={this.props.openModal}
          />
        </div>
        {/* </Link> */}
      </div>
    );
  }
}
export default withRouter(KonfessionCard);
