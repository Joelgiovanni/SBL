import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Success.css';

class Subscriptions extends Component {
  componentDidMount() {
    console.log(this.props);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='container text-center success-container'>
        <h1 className='success-header'>
          Payment Successfully Processed!<i className='fas fa-check ml-2'></i>
        </h1>
        <h5 className='text-white mt-5 mb-5'>
          <Link className='started' to='/dashboard'>
            LETS GET STARTED
          </Link>{' '}
        </h5>
        <h1 className='good-luck'>
          Good Luck! <i className='far fa-thumbs-up'></i>
        </h1>
      </div>
    );
  }
}

// Setting up Redux in this component
Subscriptions.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, null)(withRouter(Subscriptions));
