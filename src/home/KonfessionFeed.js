import React, { Component } from "react";
import Konfession from "../models/Konfession";
import SingleKonfession from "../konfession/SingleKonfession";
import Hashtag from "../models/Hashtag";

export default class KonfessionFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allKonfessions: []
    };
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params.hashtagKey){
      this.fetchKonfessionsByHashtag()
    } else {
      this.fetchKonfessions().finally(() => {
        this.setState({ isLoading: false });
      });
    }

  }

  /**
   * fetch all confessions at load
   */
  async fetchKonfessions() {
    try {
      const _allKonfessions = await Konfession.fetchList({
        sort: "-createdAt",
        
      });
      console.log("all confession", _allKonfessions);
      await this.setState({
        allKonfessions: _allKonfessions
      });
    } catch (e) {
      console.log(e);
    }
  }

  async fetchKonfessionsByHashtag(){
    console.log(this.props.match.params.hashtagKey)
    const _konIds = await Hashtag.fetchList({sort: "-createdAt", text : this.props.match.params.hashtagKey})
    if (_konIds.length > 0) {
      let _allKonfessions = []
      for (let i = 0 ; i < _konIds.length ; i++ ) {
        const _konf = await Konfession.findById(_konIds[i].attrs.konfessionId);
        if (_konf) {
          await _allKonfessions.push(_konf)
          console.log("all confession", _allKonfessions);
        }
      }
      this.setState({
        allKonfessions : _allKonfessions,
        isLoading : false
      })
    } else {
      this.props.history.push(`/`)
    }  }

  async getKonfessionById(konId){
    const _konf = await Konfession.findById(konId);
    return _konf;
  }
  

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-lg-10 col-xl-6 mx-auto">
          {!this.state.isLoading && this.state.allKonfessions.length !== 0 ? (
            <div>
              {this.state.allKonfessions.map(konfession => {
                return <SingleKonfession konfession={konfession} />;
              })}
              <div style={{ width: "100%" }}></div>
            </div>
          ) : !this.state.isLoading ? (
            <div>
              {" "}
              <p>No Sketches to display</p>
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    );
  }
}
