import React, { Component } from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <section id='featured-services'>
        <Carousel />
        <div className='container mb-5'>
          <div className='row mt-3 mb-5'>
            <div className='col-md-12'>
              <h2 className='text-center start-today'>START TODAY</h2>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4 box'>
              <i className='ion-ios-heart-outline'></i>
              <h2 className='title sub-title'>Daily</h2>
              <p className='description'>
                A Daily pass for all of our picks is available for only $20
                <br />{' '}
                <span className='text-danger mt-2'>
                  *Must be logged in to purchase
                </span>
              </p>
              <button className='submit-btn mt-2'>
                <Link className='' to='/subscriptions'>
                  Buy Now
                </Link>
              </button>
            </div>

            <div className='col-lg-4 box box-bg'>
              <h3 className='title sub-title'>Weekly</h3>
              <p className='description'>
                Weekly passes for all of our picks is available for only $100{' '}
                <br />{' '}
                <span className='text-danger mt-2'>
                  *Must be logged in to purchase
                </span>
              </p>
              <button className='submit-btn mt-2'>
                <Link className='' to='/subscriptions'>
                  Buy Now
                </Link>
              </button>
            </div>

            <div className='col-lg-4 box'>
              <i className='ion-ios-heart-outline'></i>
              <h2 className='title sub-title'>Monthly</h2>
              <p className='description'>
                If you want the most bang for your buck, a monthly pass is the
                way to go for $350
                <br />{' '}
                <span className='text-danger mt-2'>
                  *Must be logged in to purchase
                </span>
              </p>
              <button className='submit-btn mt-2'>
                <Link className='' to='/subscriptions'>
                  Buy Now
                </Link>
              </button>
            </div>
          </div>

          <div className='row mt-5 mb-5 big-row'>
            <div className='col-md-6 text-center'>
              <h1 className='big-header mt-5'>Win Big</h1>
              <i class='fas fa-chart-line big-icon'></i>
              <p className='big-text mt-5 mb-4'>
                The Sports Bet Leader team knows what sports betting is all
                about. Follow our system to become a winner among winners.{' '}
              </p>
            </div>
            <div className='col-md-6 text-center'>
              <h1 className='big-header mt-5'>Collect Big</h1>
              <i class='fas fa-dollar-sign big-icon'></i>
              <p className='big-text mt-5 mb-4'>
                The Sports Bet Leader teams knows how to put money in your
                pockets daily. Be part of the #1 sports consulting team in the
                world
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
