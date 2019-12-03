import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from "react-router";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  PocketShareButton,
  InstapaperShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
} from 'react-share';
import SnackBarWrapper from '../shared/SnackBarWrapper';
Modal.setAppElement('body')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
  }
};
const shareStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    // padding: '30px',
    float: 'left'
  }
};
class KonfessionMoreButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toBeDeleted: null,
      open: false,
      deleteModalIsOpen: false,
      shareModalIsOpen: false,
    };
  }
  componentDidMount() {
  }

  openDeleteModal() {
    this.setState({ deleteModalIsOpen: true });
  }
  async onDeleteSketch() {
    this.closeDeleteModal()

    try {
      await this.props.konfession.destroy()
      // if (this.props.match && this.props.match.params.sketchId) {
      //   let _sketch = await Sketch.findById(this.props.sketch.attrs._id)
      //   await _sketch.destroy()

      // } else {
      //   await this.props.sketch.destroy()

      // }


    } catch (e) {
      console.log("unable to delete")
    }
    //if on single sketch page, redirect
    if (this.props.match && this.props.match.params.sketchId) {
      this.props.history.push(`/`)
    } else {
      this.props.fetchKonfessions()
    }
  }

  closeDeleteModal() {
    this.setState({ deleteModalIsOpen: false });
  }


  /**COPY POST LINK */
  getPostLink() {
    var textField = document.createElement('textarea')
    textField.innerText = `https://confessin.com/confession/${this.props.konfession.attrs._id}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    this.setOpen()
  }

  isOwner() {
    const { userSession } = this.props
    if (userSession.isUserSignedIn()) {
      return userSession.loadUserData().username === this.props.konfession.attrs.username
    }
    return false;
  }

  /**
   * opens snackbar
   */
  setOpen() {
    this.setState({
      open: true
    })
  }
  handleCloseSnackBar() {
    this.setState({
      open: false
    })
  }
  /**SHARE ON SOCIAL MEDIA */
  openShareModal() {
    this.setState({ shareModalIsOpen: true });
  }

  closeShareModal() {
    this.setState({ shareModalIsOpen: false });
  }


  render() {
    return (
      <React.Fragment>
        <div className="dropdown">
          <div className="btn-more" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Love">
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.isOwner() &&
              <React.Fragment>
                <a className="dropdown-item" onClick={() => this.openDeleteModal()}>
                  <i className="fas fa-trash ikonfess"></i>&nbsp;&nbsp;
                Delete
                </a>
                <a className="dropdown-item" onClick={this.props.editKonfession}>
                  <i className="fas fa-pen ikonfess"></i>&nbsp;&nbsp;Edit
                </a>
                <div className="dropdown-divider"></div>
              </React.Fragment>
            }
            <a className="dropdown-item" onClick={() => this.openShareModal()}>
            <i className="fas fa-share ikonfess"></i>&nbsp;&nbsp;Share
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={() => this.getPostLink()}>
            <i className="fas fa-copy ikonfess"></i>&nbsp;&nbsp;Copy Link
            </a>
          </div>
        </div>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          // onAfterOpen={this.afterOpenModal}	     
          onRequestClose={this.closeDeleteModal.bind(this)}
          style={customStyles}
          contentLabel="Delete Confirmation"
        >

          <div className="" id="exampleModal" tabIndex="" aria-labelledby="exampleModalLabel">
            <div className="" role="">
              <i className="fas fa-exclamation-circle fa-3x text-danger"></i>
              <h3 className="modal-title" id="exampleModalLabel">Are you sure?</h3>
              Your konfession <b>cannot</b> be recovered once it's deleted.
            <div className="footer" style={{ padding: '30px 10px 10px 10px' }}>
                <button type="button" className="btn btn-secondary" onClick={this.closeDeleteModal.bind(this)}>Cancel</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onDeleteSketch.bind(this)}>Delete</button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.shareModalIsOpen}
          onRequestClose={this.closeShareModal.bind(this)}
          style={shareStyles}
          contentLabel="Delete Confirmation"
        >
          <h5>Share this confession on social media</h5>
          <div>
            <FacebookShareButton
              url={`https://confessin.com/confession/${this.props.konfession.attrs._id}`}
              quote="Check out this funny confession on Confessin.com"
              className="social-butt"
            >
              <FacebookIcon
                size={50}
                round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://confessin.com/confession/${this.props.konfession.attrs._id}`}
              quote="Check out this funny confession on Confessin.com"
              className="social-butt"
            >
              <TwitterIcon
                size={50}
                round />
            </TwitterShareButton>
            <TelegramShareButton
              url={`https://confessin.com/confession/${this.props.konfession.attrs._id}`}
              quote="Check out this funny confession on Confessin.com"
              className="social-butt"
            >
              <TelegramIcon
                size={50}
                round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={`https://confessin.com/confession/${this.props.konfession.attrs._id}`}
              quote="Check out this funny confession on Confessin.com"
              className="social-butt"
            >
              <WhatsappIcon
                size={50}
                round />
            </WhatsappShareButton>
          </div>
        </Modal>
        <SnackBarWrapper
          message="Link copied to clipboard"
          open={this.state.open}
          variant="success"
          onClose={this.handleCloseSnackBar.bind(this)} />
      </React.Fragment>
    )
  }
}

export default withRouter(KonfessionMoreButton)