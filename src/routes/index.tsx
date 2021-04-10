import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Customers from '../pages/Customers';
import Products from '../pages/Products';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../pages/Profile';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signout' component={Signout}/>
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/customers' component={Customers}/>
      <ProtectedRoute exact path='/products' component={Products}/>
      <ProtectedRoute exact path='/profile' component={Profile}/>
    </Switch>
  </Router>
);

export default Routes;
