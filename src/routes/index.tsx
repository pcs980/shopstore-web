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
import ProductDetail from '../pages/ProductDetail';
import NotFound from '../pages/NotFound';
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
      <ProtectedRoute exact path='/products/:id' component={ProductDetail}/>
      <ProtectedRoute exact path='/profile' component={Profile}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default Routes;
