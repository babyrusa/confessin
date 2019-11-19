import React, { Component } from "react";
import Reaction from "../models/Reaction";

export default class KonfessionReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      konfession : {
        attrs : {
          _id : '',
          username: '',
          index : '',
          createdAt : '',
          topic : []
        }
      },
      virtueCount: 0,
      sinCount: 0,
      deadlySinCount: 0,
    }
  }
  componentDidMount(){
    this.setState({
      konfession : this.props.konfession
    }, () => this.fetchReactions())
  }
  async fetchReactions(){
    let _reactions = await Reaction.fetchList({ konfessionId : this.state.konfession.attrs._id} , { decrypt: false })
    let _virtueCount = 0, _sinCount = 0, _deadlySinCount = 0;

    _reactions.forEach(reaction => {
      if (reaction.attrs.type === 'virtue') {
        _virtueCount += 1;
      } else if (reaction.attrs.type === 'sin') {
        _sinCount += 1;
      } else if (reaction.attrs.type === 'deadly sin') {
        _deadlySinCount += 1;
      }
    })
    this.setState({
      virtueCount : _virtueCount,
      sinCount : _sinCount,
      deadlySinCount : _deadlySinCount
    })
  }

  /**
   * main function that save reactions to DB
   * @param {*} reactionType 
   */
  async saveReaction(reactionType) {
    const {userSession} = this.props
    let _reaction = new Reaction({
      konfessionId : this.state.konfession.attrs._id,
      username: userSession.loadUserData().username,
      type: `${reactionType}`,
    });
    await _reaction.save();
    this.updateSketchReactions();
  }

  async updateSketchReactions() {
    //first check if this konfession belongs to this user
    // let _sketch = await Sketch.findById(this.state.sketch.attrs._id);
    // _sketch.update({
    //   reactionCount: this.state.reactionCount,
    //   loveCount: this.state.loveCount,
    //   laughCount: this.state.laughCount,
    //   poopCount: this.state.poopCount,
    // });
    // await _sketch.save();
  }
  render(){
    return(
      <React.Fragment>
      <div className="konfession-reaction-wrapper">
        <div className="konfession-reaction">
          <div>
          {this.state.virtueCount}
          </div>
        <button className="btn-primary btn-circle"
        data-toggle="tooltip" title="Virtue">
          😇
        </button>
        </div>
        <div className="konfession-reaction">
        <div>
        {this.state.sinCount}
          </div>
        <button className="btn-primary btn-circle" 
        data-toggle="tooltip" title="Sin">
          😈
        </button>
        </div>
        <div className="konfession-reaction">
        <div>
        {this.state.deadlySinCount}
          </div>
        <button className="btn-primary btn-circle"
        data-toggle="tooltip" title="Deadly Sin">
          💀
        </button>
        </div>
      </div>
      </React.Fragment>
    )
  }
}