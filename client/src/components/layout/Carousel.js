import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

export default class Carousel extends Component {
  render() {
    return (
      <section id='intro'>
        <div className='intro-container'>
          <div
            id='introCarousel'
            className='carousel  slide carousel-fade'
            data-ride='carousel'
          >
            <ol className='carousel-indicators'></ol>

            <div className='carousel-inner' role='listbox'>
              <div className='carousel-item active'>
                <div className='carousel-background'>
                  <img
                    class='carousel-imgg'
                    src='https://images.unsplash.com/photo-1514511719-9f5849dc16d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80'
                    alt=''
                  />
                </div>
                <div className='carousel-container'>
                  <div className='carousel-content'>
                    <h2>The Sports Bet Leader</h2>
                    <p className='mb-3'>
                      The Sports Bet Leader is the best in the business. With
                      years of experience, we are commited to giving you the
                      best picks!
                    </p>
                    <Link className='get-started' to='/subscriptions'>
                      Get Started
                    </Link>{' '}
                  </div>
                </div>
              </div>

              <div className='carousel-item'>
                <div className='carousel-background'>
                  <img
                    class='carousel-imgg'
                    src='https://images.unsplash.com/photo-1529663297269-6d349ec39b57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
                    alt=''
                  />
                </div>
                <div className='carousel-container'>
                  <div className='carousel-content'>
                    <h2>The Sports Bet Leader</h2>
                    <p className='mb-3'>
                      The Sports Bet Leader is the best in the business. With
                      years of experience, we are commited to giving you the
                      best picks!
                    </p>
                    <Link className='get-started' to='/subscriptions'>
                      Get Started
                    </Link>{' '}
                  </div>
                </div>
              </div>

              <div className='carousel-item'>
                <div className='carousel-background'>
                  <img
                    class='carousel-imgg'
                    src='https://images.unsplash.com/photo-1571056642234-71f5b2c5c0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
                    alt=''
                  />
                </div>
                <div className='carousel-container'>
                  <div className='carousel-content'>
                    <h2>The Sports Bet Leader</h2>
                    <p className='mb-3'>
                      The Sports Bet Leader is the best in the business. With
                      years of experience, we are commited to giving you the
                      best picks!
                    </p>
                    <Link className='get-started' to='/subscriptions'>
                      Get Started
                    </Link>{' '}
                  </div>
                </div>
              </div>
            </div>

            <a
              className='carousel-control-prev'
              href='#introCarousel'
              role='button'
              data-slide='prev'
            >
              <span
                className='carousel-control-prev-icon ion-chevron-left'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Previous</span>
            </a>

            <a
              className='carousel-control-next'
              href='#introCarousel'
              role='button'
              data-slide='next'
            >
              <span
                className='carousel-control-next-icon ion-chevron-right'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Next</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
}
