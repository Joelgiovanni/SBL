import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer id='footer'>
        <div className='footer-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-3 col-md-6 footer-info'>
                <h3>The Sports Bet Leader</h3>
                <p>
                  The sports Bet Leader is not responsible for any decisions
                  made based off our picks. Bet at your own risk. Results are
                  not always guaranteed.
                </p>
              </div>

              <div className='col-lg-3 col-md-6 footer-links'>
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <Link className='' to='/'>
                      Home
                    </Link>{' '}
                  </li>
                  <li>
                    <Link className='' to='/register'>
                      Start Today
                    </Link>{' '}
                  </li>
                  <li>
                    <Link className='' to='/aboutUs'>
                      About Us
                    </Link>{' '}
                  </li>
                </ul>
              </div>

              <div className='col-lg-3 col-md-6 footer-contact'>
                <h4>Contact Us</h4>
                <p>
                  Denver, CO
                  <br />
                  <strong>Phone:</strong> 720-346-3787
                  <br />
                  <strong>contactsportsbetleader@gmail.com</strong>
                  <br />
                </p>

                <div className='social-links'>
                  <a
                    href='https://www.facebook.com/thesportsbetleader/?ref=py_c'
                    target='_none'
                    className='facebook'
                  >
                    <i className='fab fa-facebook'></i>
                  </a>
                  <a
                    href='https://www.instagram.com/sportsbetleader/?hl=en'
                    target='_none'
                    className='instagram'
                  >
                    <i className='fab fa-instagram'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='copyright'>
            &copy; Copyright <strong>BizPage</strong>. All Rights Reserved
          </div>
        </div>
      </footer>
    );
  }
}
