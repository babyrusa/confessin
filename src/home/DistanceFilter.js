import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import Distance from "../shared/distance";
import { Sliders } from "react-feather";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
    // width: 200
  }),
  menu: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    padding: 20,
    width: 200,
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    width: 200,
    borderRadius: 20,
    border: "none",
    boxShadow: "none"
    // backgroundColor : '#ffdce2'
  }),
  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';
    // return { ...provided, opacity, transition };
  }
};

export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.distance = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "5", label: "5" },
      { value: "10", label: "10" },
      { value: "50", label: "50" },
      { value: "100", label: "100" }
    ];

    this.state = {
      distance: 0,
      showFilter: false,
      selectedUnit: 'km'
    };
  }
  handleChange(newValue: any, actionMeta: any) {
    // console.log("Value Changed", newValue);
    if (newValue) {
      this.setState(
        {
          distance: newValue.value
        },
        () => this.getCurrentLocation()
      );
    } else {
      this.props.setLatLong("", "");
    }
    // this.getCurrentLocation();
  }
  handleInputChange(inputValue: any, actionMeta: any) {}
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLatLong.bind(this));
    } else {
      alert("Unable to get your location");
    }
  }
  setLatLong(location) {
    if (this.state.selectedUnit === "km") {
      const { latitude, longitude } = Distance.getLatLonFromDistanceKm(
        location.coords.latitude,
        location.coords.longitude,
        this.state.distance
      );
      this.props.setLatLong(latitude, longitude);
    } else if (this.state.selectedUnit === "mi"){
      const { latitude, longitude } = Distance.getLatLonFromDistanceMi(
        location.coords.latitude,
        location.coords.longitude,
        this.state.distance
      );
      this.props.setLatLong(latitude, longitude);
    }
  }
  onShowDistanceFilter() {
    this.setState({
      showFilter: !this.state.showFilter
    });
  }
  selectUnit(unit){
    this.setState({
      selectedUnit : unit
    })
  }
  render() {
    return (
      <div className="distance-filter-wrapper">
        <span
          className="filter-butt"
          onClick={this.onShowDistanceFilter.bind(this)}
        >
          <Sliders />
        </span>

        {this.state.showFilter && (
          <div className="distance-filter">
            {/* Location detector accuracy : Good */}
            <div className="unit-selection">
            <span className={"unit " + (this.state.selectedUnit === "km" ? "selected-unit" : "")}
            onClick={this.selectUnit.bind(this,"km")}
            data-toggle="tooltip" title="kilometers">
              km</span>
            <span>&nbsp;|&nbsp;</span>
            <span className={"unit " + (this.state.selectedUnit === "mi" ? "selected-unit" : "")}
            onClick={this.selectUnit.bind(this,"mi")}
            data-toggle="tooltip" title="miles">
              mi</span>
            </div>
            <CreatableSelect
              styles={customStyles}
              isClearable
              onChange={this.handleChange.bind(this)}
              onInputChange={this.handleInputChange.bind(this)}
              options={this.distance}
              placeholder="Filter distance"
            />
          </div>
        )}
      </div>
    );
  }
}
