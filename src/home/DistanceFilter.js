import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';
import Distance from '../shared/distance';
import { Sliders } from "react-feather";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
    width: 200
  }),
  menu: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    padding: 20,
    width: 200
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
      ...provided,
    width: 200,
    borderRadius: 20,
    border : 'none'
    // backgroundColor : '#ffdce2'
  }),
  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...provided, opacity, transition };
  }
}

export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.distance = [
      { value: '1', label: '1km' },
      { value: '2', label: '2km' },
      { value: '5', label: '5km' },
      { value: '10', label: '10km' },
      { value: '50', label: '50km' },
      { value: '100', label: '100km' }
    ]

    this.state = {
      distance : 0,
      showFilter : false,
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
  onShowDistanceFilter(){
    this.setState({
      showFilter : !this.state.showFilter
    })
  }
  render() {
    return (
      <div className="distance-filter-wrapper">
        <span className="filter-butt" onClick={this.onShowDistanceFilter.bind(this)}>
      <Sliders/>
      </span>
      
      {this.state.showFilter && 
      <div className="distance-filter">
        Location detector accuracy : Good
        <span className="selected-unit">
        km
      </span>
      <span>
      &nbsp;|&nbsp;
      </span>
      <span>
        mi
      </span>
      <CreatableSelect
      styles={customStyles}
        isClearable
        onChange={this.handleChange.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        options={this.distance}
      />
      
      </div>}
      </div>
    )
  }
}