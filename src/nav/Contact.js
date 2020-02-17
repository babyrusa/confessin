import React, { Component } from 'react';

export default class Contact extends Component {
  render(){
    return(
      <div>
        <div className="row">
          <div className="col-6 mx-auto">
            <h1>Hi Sinner</h1>
            <p>Thank you for choosing ConfesSin. <br/>
              We would love to hear about your feedback, an issue you faced or a feature request you have in mind. 
              ConfesSin is developed day-by-day to ensure that you have the best experience.
              <i className="far fa-grin-hearts fa-2x"></i>
              </p>
            <br/>
            <h5><i class="fas fa-envelope"></i>&nbsp;confessin.app@gmail.com</h5>
            <small>We will respond faster if you reach out via Telegram or Twitter</small>
            <div style={{borderTop : "1px solid #ff66b6"}}></div>
            <br/>
            <a role="button" className="btn btn-primary btn-circle btn-social" href="https://t.me/confessin" target="_blank">
            <i className="fab fa-telegram-plane"></i>
            </a>
            <a role="button" className="btn btn-primary btn-circle btn-social" href="https://twitter.com/ConfessinApp" target="_blank">
            <i className="fab fa-twitter"></i>
            </a>
            <a role="button" className="btn btn-primary btn-circle btn-social" href="https://www.facebook.com/confessinapp/" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a role="button" className="btn btn-primary btn-circle btn-social" href="https://www.instagram.com/confessin.app/" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a role="button" className="btn btn-primary btn-circle btn-social" href="https://github.com/babyrusa/confessin" target="_blank">
              <i className="fab fa-github"></i>            
            </a>
            <br/>
            {/* <br/>
            Please vote for us on
            <br/>
            <a href="https://www.producthunt.com/posts/dcasso?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dcasso" target="_blank">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=173183&theme=light" alt="Dcasso - De-centralized doodling app powered by Blockstack | Product Hunt Embed" style={{width: '250px', height: '54px'}} width="250px" height="54px" /></a>
         */}
          </div>
        </div>

      </div>
    )
  }
}