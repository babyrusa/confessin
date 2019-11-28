import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

Modal.setAppElement('body')
const customStyles = {
  content : {
    width : '600px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '30px'
  }
};
export default class SignInNoticeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
 
  render(){
    return(
      <Modal
      isOpen={this.props.modalIsOpen}	      
      onRequestClose={this.props.closeModal}	      
      style={customStyles}
      contentLabel="Log In"	    
      >
      <div className="container">
        <div className="row" >
          <div className="col-12" >
            <img src="/images/confessin-small.png" width="50"/><br/>
            <h5 className="modal-title">One last step til you can open your soul to us</h5> 
          </div>
        </div>
        <div className="row" >
        <div className="col" >
          <Link to="/signin">
            <button type="button" className="btn btn-primary"   style={{fontSize : '1rem'}}>Sign In</button>
          </Link>
        </div>
        <div className="col" >

          <button type="button" className="btn btn-outline-secondary" onClick={this.props.closeModal}
          style={{fontSize : '1rem'}}>
          Continue scrolling
          </button>
        </div>
        </div>
      </div>
      </Modal>
    )
  }

  
}