import React from 'react';

// Layouts
import Home from './components/Shared/Home';
import Sidebar from './components/Shared/Sidebar';
import Header from './components/Shared/Header';
import NotFound from './components/Shared/NotFound';
import Timetable from './components/Shared/Timetable';

// Components
import Booking from './components/Booking/Booking';
import SignInForm from './components/Auth/SignInForm';
import SignUpForm from './components/Auth/SignUpForm';
import TrainingSessionContainer from './components/TrainingSession/TrainingSessionContainer';
import Account from './components/Account/Account';

import 'whatwg-fetch'; // Polyfills window.fetch
import { signOut } from './api/auth';
import { Link, Match, Miss } from 'react-router';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }

    this.onUserSignedIn = this.onUserSignedIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    // this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  onUserSignedIn(user) {
    this.setState({ currentUser: user })
  }

  onSignOut() {
    this.setState({ currentUser: null })
    signOut();
  }

  render() {
    const isLoggedIn = !!this.state.currentUser;
    let logInControl = null;
    if (isLoggedIn) {
      logInControl = <li onClick={this.onSignOut}><strong>Log Out</strong></li>;
    } else {
      logInControl = <Link to='/login'><li><strong>Log In</strong></li></Link>;
    };

    return (
      <div className="App">
        <Header />
        <Sidebar logInControl={logInControl} />

        {/* Main Content */}
        <div id="content-wrapper">
          <div className="mui--appbar-height"></div>
          <div className="mui-container-fluid">
            <Match exactly pattern='/' component={Home} />
            <Match exactly pattern='/signup' render={() => <SignUpForm onUserSignedIn={this.onUserSignedIn} />} />
            <Match exactly pattern='/login' render={() => <SignInForm onUserSignedIn={this.onUserSignedIn} />} />
            <Match pattern='/trainingSessions' component={TrainingSessionContainer} />
            <Match pattern='/bookings' render={() => <Booking currentUser={this.state.currentUser} />} />
            <Match pattern='/account' render={() => <Account currentUser={this.state.currentUser} />} />
            <Miss component={NotFound} />
          </div>
          <Match pattern='/timetable' component={Timetable} />
        </div>
      </div>
    );
  }
}

export default App;

// <SignInForm onUserSignedIn={this.onUserSignedIn} />

{/* <ul className="main-navigation">
  <li><Link to='/'>Home</Link></li>
  <li><Link to="/signup">Sign Up</Link></li>
  <li><Link to="/trainingSessions">Training Sessions</Link></li>
  <li><Link to="/bookings">Book</Link></li>
  { logInControl }
</ul> */}
