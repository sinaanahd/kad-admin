import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';

import FinancePage from './components/financial/finance';
import Login from './components/login/login';
import NotFound from './components/404/404';
import ClassesPage from './components/classes/classes';
import EditClassPage from './components/edit-class/edit-class';
import MyAccount from './components/my-account/my-account';
import Essentials from './components/essentials/essentials';
import UsersPage from './components/users/users';
import SingleUser from './components/single-user/single-user';
import AllAdminPage from './components/all-admin/all-admin';
import SingleAdmin   from './components/single-admin/single-admin';

import './asset/css/index.scss';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/finance" component={FinancePage} />
        <Route path="/classes" exact component={ClassesPage} />
        <Route path="/classes/:id"  component={EditClassPage} />
        <Route path="/login" component={Login} />
        <Route path="/users" exact component={UsersPage} />
        <Route path="/users/:id" component={SingleUser} />
        <Route path="/account" component={MyAccount} />
        <Route path="/essentials" component={Essentials} />
        <Route path="/all-admins" component={AllAdminPage} />
        <Route path="/admin/:id" component={SingleAdmin} />
        {/* <Route path="/test" component={Login} /> */}
        <Redirect from="/" exact to="/login" />
        {/* <Route path="/not-found" component={MyAccount} /> */}
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
