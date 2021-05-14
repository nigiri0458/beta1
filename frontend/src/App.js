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
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';



import './App.css';

function App() {
  return (
    <Router>
        <AppBar color="default">

        </AppBar>

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
