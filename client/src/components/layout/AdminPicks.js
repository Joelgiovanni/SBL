import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './AdminCard';
import './AdminPicks.css';

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
    console.log(this.state);

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (this.state.isAdmin === false) {
      this.props.history.push('/');
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

  deletePost = id => {
    axios
      .delete('/auth/deletePost', {
        params: {
          id
        }
      })
      .then(res => {
        this.fetchPosts();
      })
      .catch(err => console.log(err));
  };

  render() {
    let content;

    // If posts are not empty and the data is loaded then render the posts..
    if (this.state.posts.length > 0 && this.state.loaded === true) {
      const posts = this.state.posts;

      content = posts.map(post => (
        <Card
          title={post.gameTitle}
          league={post.league}
          date={post.date}
          body={post.body}
          id={post._id}
          delete={this.deletePost}
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
      <div className='container mt-4 admin-picks-container'>
        <div className='row'>
          <div className='col text-center'>
            <h3>
              <span className='welcome'>Hello, </span>
              <span className='userName'>{this.props.auth.user.name}</span>
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
