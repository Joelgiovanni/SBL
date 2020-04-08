import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './Register.css';

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      success: false,
      errors: {},
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    // This is the call that fires off the Register action
    axios
      .post('/auth/admin1997stayaway', userData)
      .then((res) => alert('Yuppppp'))
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='container form-container mt-5 text-center'>
        <h1 className='register-header'>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.name,
              })}
              placeholder='Enter Name'
              name='name'
              onChange={this.onChange}
              value={this.state.name}
            />
            {errors.name && (
              <div className='invalid-feedback'> {errors.name} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.email,
              })}
              placeholder='Enter Email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
            />{' '}
            {errors.email && (
              <div className='invalid-feedback'> {errors.email} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.password,
              })}
              placeholder='Enter Password'
              name='password'
              onChange={this.onChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className='invalid-feedback'> {errors.password} </div>
            )}
          </div>
          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <input
              type='password'
              className={classnames('form-control text-center', {
                'is-invalid text-center': errors.password2,
              })}
              placeholder='Confirm Password'
              name='password2'
              onChange={this.onChange}
              value={this.state.password2}
            />
            {errors.password2 && (
              <div className='invalid-feedback'> {errors.password2} </div>
            )}
          </div>

          <button type='submit' className='btn register-btn'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

export default RegisterAdmin;
