import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false
    };
  }

  render() {
    return (
      <div className='card text-center mt-4 mb-5'>
        <div className='card-header'>{this.props.league}</div>
        <div className='card-body'>
          <h5 className='card-title'>{this.props.title}</h5>
          <p className='card-text'>{this.props.body}</p>
        </div>
        <div className='card-footer text-danger'>* {this.props.date} *</div>
      </div>
    );
  }
}

export default Card;
