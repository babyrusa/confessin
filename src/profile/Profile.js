import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import ProfileFeed from './ProfileFeed';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
    };
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return (
      <React.Fragment>
      <div className="avatar-section" align="center">
        < div className="avatar"
          style={{
            backgroundImage: `url(${person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} />
        {/* <img src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage} className="img-rounded avatar" id="avatar-image" alt="" /> */}
      </div>
      <h1 className="profile-h1"><span id="heading-name">{person.name() ? person.name() : 'Nameless Person'}</span>!</h1>
      <ProfileFeed userSession = {this.props.userSession}/>
      </React.Fragment>
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
