import React, { Component } from "react";
import Konfession from "../models/Konfession";
import SingleKonfession from "../konfession/SingleKonfession";

export default class KonfessionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      allKonfessions: []
    }
  }

  componentDidMount(){
    this.fetchKonfessions().finally(() => { 
      this.setState({ isLoading: false })
    }) 
  }

  /**
   * fetch all confessions at load
   */
  async fetchKonfessions(){
    try {
      const _allKonfessions = await Konfession.fetchList({sort: '-createdAt'})
      console.log("all confession",_allKonfessions)
      await this.setState({
        allKonfessions : _allKonfessions
      })
    } catch(e){
      console.log(e)
    }
   
  }

  render() {
    return (
      !this.state.isLoading && this.state.allKonfessions.length !== 0 ?
        <div>
          {this.state.allKonfessions.map(konfession => {
            return <SingleKonfession konfession = {konfession}/>
          })}
          <div style={{width:'100%'}}>
          </div>
        </div>
        : (
        !this.state.isLoading ? 
        <div> <p>No Sketches to display</p></div>
         : <p>loading...</p>
        )

    )
  }
}