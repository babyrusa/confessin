import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';
import Distance from '../shared/distance';
export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.distance = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

    this.state = {
    }
  }
  handleChange(newValue: any, actionMeta: any) {
    // console.group('Value Changed');
    console.log('Value Changed',newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  handleInputChange(inputValue: any, actionMeta: any) {
    // console.group('Input Changed');
    console.log('Input Changed',inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
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