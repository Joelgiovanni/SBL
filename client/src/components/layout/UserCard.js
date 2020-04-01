import React, { Component } from 'react';
import axios from 'axios';
import './UserCard.css';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      subvalue: '',
      custId: this.props.id
    };
  }

  // Set initial state based on the sub that the user already has
  componentDidMount() {
    this.setState({ subvalue: this.props.subType });
  }

  // Change state upon selection
  onChange = e => {
    this.setState({ subvalue: e.target.value });
  };

  // Axios call to change the subscription type in database
  changeSub = e => {
    const data = {
      id: this.state.custId,
      membershipType: this.state.subvalue
    };

    axios
      .post('/auth/updateSub', data)
      .then(res => alert('Success!'))
      .catch(err => console.log('errors'));
  };

  render() {
    return (
      <div class='card user-card col-md-4'>
        <div class='card-body user-card-body'>
          <h5 class='card-title mb-4'>{this.props.name}</h5>
          <h6 class='card-subtitle mb-4 text-muted'>{this.props.email}</h6>
          <h6 class='card-subtitle mb-2'>
            Membership Type:{' '}
            <span className='text-danger'>{this.props.subType}</span>
          </h6>
          <p className='mt-4'>Change Membership</p>

          <div class='input-group'>
            <select
              class='custom-select'
              id='inputGroupSelect04'
              value={this.state.subType}
              onChange={this.onChange}
            >
              <option name='null' value='null'>
                Select Option
              </option>
              <option name='Expired' value='Expired'>
                Expired
              </option>
              <option name='Daily' value='Daily'>
                Daily
              </option>
              <option name='Weekly' value='Weekly'>
                Weekly
              </option>
              <option name='Monthly' value='Monthly'>
                Monthly
              </option>
            </select>
            <div class='input-group-append'>
              <button
                class='btn btn-outline-secondary'
                type='button'
                onClick={this.changeSub}
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
