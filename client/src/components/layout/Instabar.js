import React, { Component } from 'react';
import './Instabar.css';

export default class Instabar extends Component {
  render() {
    return (
      <div className='container-fluid text-right instabar-container'>
        <h2>
          <i class='fab fa-instagram'></i>{' '}
        </h2>
      </div>
    );
  }
}
