import React from 'react';
import {Cart} from './containers/Cart';
import {EditUser} from './containers/EditUser';
import {EventDetails} from './containers/EventDetails';
import {Events} from './containers/Events';
import {Login} from './containers/Login';
import {OrderHistories} from './containers/OrderHistories';
import {Orders} from './containers/Orders';
import {Signup} from './containers/Signup';
import {User} from './containers/User';

import {Top} from './components/Top';

// Router
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

// Material UI
import HomeIcon from '@material-ui/icons/Home';

// CSS
import './App.css';
import './styles/Header.css';

function App() {
  return (
    <Router>
        <header>
          <div className="home-button">
            <Link to="/top">
              HomeIcon
            </Link>
          </div>
          <div className="header-right">
            <div className="header-button">
              Login
            </div>
            <div className="header-button">
              Sign Up
            </div>
            <div className="header-button">
              Menu Bar
            </div>
          </div>
        </header>
        

        <Switch>
          <Route exact path="/top">
            <Top />
          </Route>

          <Route exact path="/events">
            <Events />
          </Route>

          <Route exact path="/events/:event_id">
            <EventDetails />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/users/:user_id">
            <User />
          </Route>

          <Route exact path="/users/edit">
            <EditUser />
          </Route>

          <Route exact path="/users/:user_id/cart">
            <Cart />
          </Route>

          <Route exact path="/order_histories">
            <OrderHistories />
          </Route>

          <Route exact path="/order_histories/:order_id">
            <Orders />
          </Route>

        </Switch>
      
    </Router>
  );
}

export default App;
