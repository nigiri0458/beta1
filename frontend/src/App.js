import React from 'react';
import {Cart} from './containers/Cart';
import {EditUser} from './containers/EditUser';
import {EventDetails} from './containers/EventDetails';
import {Events} from './containers/Events';
import {Login} from './containers/Login';
import {OrderHistories} from './containers/OrderHistories';
import {Orders} from './containers/Orders';
import {Signup} from './containers/Signup';
import {Mypage} from './containers/MyPage';

import {Top} from './components/Top';
import {Header} from './components/Header';


// Router
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';

import { postLogout } from './apis/users';

// Material UI
//import HomeIcon from '@material-ui/icons/Home';

// CSS
import './App.css';
import './styles/Header.css';

function App() {

  if(!(localStorage.getItem("loginState"))){
    localStorage.setItem("loginState", "false");
  }

  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/top">
            <Top />
          </Route>

          <Route exact path="/events">
            <Events />
          </Route>

          <Route exact path="/events/:event_id" render={({match}) => <EventDetails match={match} />} />

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/mypage">
            <Mypage />
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
