import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Clock } from 'styled-icons/feather/Clock';
import { CalendarWeek } from 'styled-icons/boxicons-regular/CalendarWeek';
import { Calendar } from 'styled-icons/octicons/Calendar';
import './Subscriptions.css';

class Subscriptions extends Component {
  componentDidMount() {
    console.log(this.props);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  // One day pass - Checkout
  oneDay = (e) => {
    var stripe = window.Stripe('pk_live_ZuXcysdButUm1bH2OK5eJBNi00eqonv5OH');

    stripe
      .redirectToCheckout({
        items: [{ sku: 'sku_H5kegxSWoHuqYQ', quantity: 1 }],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: 'https://www.thesportsbetleader.com/success',
        cancelUrl: 'https://www.thesportsbetleader.com/subscriptions',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        } else {
          alert('Success!!!');
        }
      });
  };

  // Weekly pass - Checkout
  weekly = (e) => {
    var stripe = window.Stripe('pk_live_ZuXcysdButUm1bH2OK5eJBNi00eqonv5OH');

    var checkoutButton = document.getElementById(
      'checkout-button-sku_GrsrY3NHUfoitu'
    );
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe
      .redirectToCheckout({
        items: [{ sku: 'sku_H5kzFJtBoO6IG1', quantity: 1 }],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: 'https://www.thesportsbetleader.com/success',
        cancelUrl: 'https://www.thesportsbetleader.com/subscriptions',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  };
  // Monthly pass - Checkout
  monthly = (e) => {
    var stripe = window.Stripe('pk_live_ZuXcysdButUm1bH2OK5eJBNi00eqonv5OH');

    var checkoutButton = document.getElementById(
      'checkout-button-sku_Grt1g8YKuVRFYp'
    );
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe
      .redirectToCheckout({
        items: [{ sku: 'sku_H5l1bG6cBGAxm2', quantity: 1 }],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: 'https://www.thesportsbetleader.com/success',
        cancelUrl: 'https://www.thesportsbetleader.com/subscriptions',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  };

  render() {
    return (
      <div className='container subs-container'>
        <div className='row text-center'>
          <div className='col-md-12'>
            <h1 className='sub-header'>subscriptions</h1>
          </div>
        </div>
        <div className='row text-center mb-5'>
          <div className='col-md-4'>
            <Clock size='150' className='why-icon mt-5' />
            <h6 className='price-header mt-3'>
              Daily: <strong>All Picks</strong> $20
            </h6>{' '}
            <button
              className='pay-now-button'
              id='checkout-button-sku_H5kegxSWoHuqYQQ'
              role='link'
              onClick={this.oneDay}
            >
              Checkout
            </button>
            <div id='error-message'></div>{' '}
          </div>
          <div className='col-md-4'>
            <CalendarWeek size='150' className='why-icon mt-5' />
            <h6 className='price-header mt-3'>
              Weekly: <strong>All Picks</strong> $100
            </h6>{' '}
            <button
              className='pay-now-button'
              id='checkout-button-sku_H5kzFJtBoO6IG1'
              role='link'
              onClick={this.weekly}
            >
              Checkout
            </button>
            <div id='error-message'></div>{' '}
          </div>
          <div className='col-md-4'>
            <Calendar size='150' className='why-icon mt-5' />
            <h6 className='price-header mt-3'>
              Monthly: <strong>All Picks</strong> $350
            </h6>{' '}
            <button
              className='pay-now-button'
              id='checkout-button-sku_H5l1bG6cBGAxm2'
              role='link'
              onClick={this.monthly}
            >
              Checkout
            </button>
            <div id='error-message'></div>
          </div>
        </div>
      </div>
    );
  }
}

// Setting up Redux in this component
Subscriptions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, null)(withRouter(Subscriptions));
