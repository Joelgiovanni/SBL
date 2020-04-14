import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import setAuthToken from './helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import NewNav from './components/layout/NewNav';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegisterAdmin from './components/auth/RegisterAdmin';
import Dashboard from './components/layout/Dashboard';
import AdminPicks from './components/layout/AdminPicks';
import Subscriptions from './components/layout/Subscriptions';
import NewPost from './components/layout/newPost';
import Footer from './components/layout/Footer';
import LoadUsers from './components/layout/LoadUsers';
import Success from './components/layout/Success';
import ScrollToTop from './components/layout/ScrollTop';

// KEEPS A USER LOGGED IN ON REFRESH && this logic will check for a valid token on every route and the token must either be manually destroyed with the logout function or the token must expire
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // This will vary depending on the amount of time that you set for token exp.
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser);
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <NewNav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/admin1997stayaway' component={RegisterAdmin} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/adminPicks' component={AdminPicks} />
            <Route exact path='/subscriptions' component={Subscriptions} />
            <Route exact path='/newPost' component={NewPost} />
            <Route exact path='/LoadUsers' component={LoadUsers} />
            <Route exact path='/success' component={Success} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    </Provider>
  );
}

export default App;
