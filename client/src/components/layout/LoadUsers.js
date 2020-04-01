import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import './LoadUsers.css';

class LoadUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      users: {},
      isAdmin: this.props.auth.user.isAdmin
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (this.state.isAdmin === false) {
      this.props.history.push('/');
    }
    this.fetchUsers();
  }

  fetchUsers = e => {
    axios
      .get('/auth/loadAllUsers')
      .then(res => {
        const fetchedUsers = res.data;
        // Set the state for the users posts
        this.setState({ users: fetchedUsers, loaded: true });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    let content;

    // If Users are not empty and the data is loaded then render the users..
    if (this.state.users.length > 0 && this.state.loaded === true) {
      const users = this.state.users;

      content = users.map(user => (
        <UserCard
          name={user.name}
          memberSince={user.memberSince}
          subType={user.membershipType}
          email={user.email}
          id={user._id}
        />
      ));
    } else {
      content = (
        <div className='row'>
          <div className='col text-center'>
            <p className='started'>No picks for today... YET.</p>
          </div>
        </div>
      );
    }
    return (
      <div className='container mt-4 users-container'>
        <div className='row'>{content}</div>
      </div>
    );
  }
}

// Setting up Redux in this component
LoadUsers.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, null)(withRouter(LoadUsers));
