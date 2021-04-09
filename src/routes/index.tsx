import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import CustomersHome from '../pages/CustomersHome';
import ProductsHome from '../pages/ProductsHome';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/customers' component={CustomersHome}/>
      <Route exact path='/products' component={ProductsHome}/>
    </Switch>
  </Router>
);

export default Routes;
