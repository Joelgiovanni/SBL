import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './NewPost.css';

class newPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.auth.user.isAdmin,
      league: '',
      gameTitle: '',
      body: ''
    };
  }

  componentDidMount() {
    // If not logged in, redirect home
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    //If not Admin, redirect home
    if (!this.props.auth.user.isAdmin) {
      this.props.history.push('/');
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const postData = {
      league: this.state.league,
      gameTitle: this.state.gameTitle,
      author: this.props.auth.user.name,
      body: this.state.body
    };

    axios
      .post('/auth/newPost', postData)
      .then(res => {
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='container new-pick-container text-center mt-5'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group mb-4'>
            <label className='form-heading'>League</label>
            <input
              type='text'
              name='league'
              value={this.state.league}
              onChange={this.onChange}
              className='form-control text-center'
              placeholder='League'
            />
          </div>
          <div className='form-group mb-4'>
            <label className='form-heading'>Title:</label>
            <input
              type='text'
              name='gameTitle'
              value={this.state.gameTitle}
              onChange={this.onChange}
              className='form-control text-center'
              placeholder='Game Title'
            />
          </div>

          <div className='form-group mt-5'>
            <label className='form-heading'>Content:</label>
            <textarea
              className='form-control text-area-pick'
              rows='4'
              name='body'
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <button type='submit' className='btn add-btn'>
            ADD
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { newPost })(newPost);
