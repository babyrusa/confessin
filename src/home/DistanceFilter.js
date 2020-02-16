import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';
import Distance from '../shared/distance';
export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.distance = [
      { value: '1', label: '1' },
      { value: '10', label: '10' },
      { value: '50', label: '50' },
      { value: '100', label: '100' }
    ]

    this.state = {
      distance : 0,
    } 
  }
  handleChange(newValue: any, actionMeta: any) {
    console.log('Value Changed',newValue);
    if (newValue) {
      this.setState({
        distance : newValue.value
      }, () => this.getCurrentLocation())
    } else {
      this.props.setLatLong('','')
    }
    // this.getCurrentLocation();
  };
  handleInputChange(inputValue: any, actionMeta: any) {
  };
  getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLatLong.bind(this));
    } else {
      alert("Unable to get your location")
    }
  }
  setLatLong(location){
    console.log(location.coords.latitude,location.coords.longitude);
    const {latitude , longitude} = Distance.getLatLonFromDistance(location.coords.latitude,location.coords.longitude, this.state.distance);
    console.log(latitude,longitude)
    this.props.setLatLong(latitude,longitude);
  }
  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        options={this.distance}
      />
    )
  }
}