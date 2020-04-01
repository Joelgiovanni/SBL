import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      posts: {},
      isAdmin: this.props.auth.user.isAdmin
    };
  }

  componentDidMount() {
    console.log(this.props.auth);

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (this.props.auth.user.membershipType === 'Expired') {
      this.props.history.push('/subscriptions');
    }
    this.fetchPosts();
  }

  fetchPosts = e => {
    axios
      .get('/auth/loadPicks')
      .then(res => {
        const fetchedPosts = res.data;

        // Set the state for the users posts
        this.setState({ posts: fetchedPosts, loaded: true });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    let content;

    // If posts are not empty and the data is loaded, render the posts..
    if (this.state.posts.length > 0 && this.state.loaded === true) {
      const posts = this.state.posts;

      content = posts.map(post => (
        <Card
          title={post.gameTitle}
          league={post.league}
          date={post.date}
          body={post.body}
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
      <div className='container admin-picks-container mt-4'>
        <div className='row'>
          <div className='col text-center'>
            <h3>
              <span className='welcome'> Welcome:</span>
              <span className='userName'>{this.props.auth.user.name}</span>
              <span className='userName'>{this.props.auth.membershipType}</span>
            </h3>
          </div>
        </div>
        {content}
      </div>
    );
  }
}

// Setting up Redux in this component
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, null)(withRouter(Dashboard));
