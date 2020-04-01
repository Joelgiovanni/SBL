import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import './Nav.css';

class NewNav extends Component {
  // Action to log out a user || Destroy token || set isAuthenticated === false
  logout = e => {
    this.props.logoutUser();
    this.props.history.push('/home');
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdmin } = this.props.auth.user;

    const notLoggedIn = (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div id='header'>
          <div className='container-fluid'>
            <div id='logo' className='pull-left'>
              <h1>
                <Link className='scrollto' to='/'>
                  The Sports Bet Leader
                </Link>{' '}
              </h1>
            </div>
          </div>
        </div>
        <button
          className='navbar-toggler ml-auto'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse mx-auto' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                <Link className='' to='/'>
                  Home
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link className='' to='/login'>
                  Login
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link className='' to='/register'>
                  Register
                </Link>{' '}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );

    const loggedIn = (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div id='header'>
          <div className='container-fluid'>
            <div id='logo' className='pull-left'>
              <h1>
                <Link className='scrollto' to='/'>
                  The Sports Bet Leader
                </Link>{' '}
              </h1>
            </div>
          </div>
        </div>
        <button
          className='navbar-toggler ml-auto'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse mx-auto' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                <Link className='' to='/'>
                  Home
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link className='' to='/subscriptions'>
                  Subscriptions
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link className='' to='/dashboard'>
                  Picks
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link className='' onClick={this.logout} to='/'>
                  Logout
                </Link>{' '}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );

    const adminLoggedIn = (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div id='header'>
          <div className='container-fluid'>
            <div id='logo' className='pull-left'>
              <h1>
                <Link className='scrollto' to='/'>
                  The Sports Bet Leader
                </Link>{' '}
              </h1>
            </div>
          </div>
        </div>
        <button
          className='navbar-toggler ml-auto'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse mx-auto' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                <Link className='' to='/'>
                  Home
                </Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link to='/newPost'>New Picks</Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link to='/AdminPicks'>Edit Picks</Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href=''>
                <Link to='/loadUsers'>Users</Link>{' '}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link to='/subscriptions'>Subscriptions</Link>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <Link onClick={this.logout} to='/'>
                  Logout
                </Link>{' '}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );

    return (
      <div>
        {(() => {
          if (isAdmin) return adminLoggedIn;
          if (isAuthenticated) return loggedIn;
          return notLoggedIn;
        })()}
      </div>
    );
  }
}

NewNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NewNav));
